<template>
    <Dialog
        v-model="visible"
        modal
        :header="mode === 'new' ? 'Create new Done It' : 'Edit Done It'"
        id="done-it-modal"
        @hide="emit('close')"
    >
        <Form
            v-slot="$form"
            @submit="createDoneIt"
            :resolver="resolver"
            :validate-on-submit="true"
        >
            <FloatLabel variant="on" class="float-label">
                <InputText
                    name="title"
                    class="float-label__text-input"
                    v-model="title"
                    autocomplete="off"
                />
                <label for="title">Title *</label>
            </FloatLabel>
            <Message
                v-if="$form.title?.invalid"
                severity="error"
                size="small"
                variant="simple"
            >
                {{ $form.title.error?.message }}
            </Message>

            <FloatLabel variant="on" class="float-label">
                <Textarea
                    name="desc"
                    class="float-label__text-input"
                    v-model="description"
                />
                <label for="desc">Description</label>
            </FloatLabel>

            <div class="time-pickers">
                <FloatLabel variant="on" class="float-label">
                    <DatePicker
                        v-model="startTime"
                        name="startTime"
                        showTime
                        hourFormat="12"
                        fluid
                    />
                    <label for="startTime">Start Time *</label>
                </FloatLabel>

                <FloatLabel variant="on" class="float-label">
                    <DatePicker
                        v-model="endTime"
                        name="endTime"
                        showTime
                        hourFormat="12"
                        fluid
                        @show="setToStartTime"
                    />
                    <label for="endTime">End Time</label>
                </FloatLabel>
            </div>
            <Message
                v-if="$form.startTime?.invalid"
                severity="error"
                size="small"
                variant="simple"
            >
                {{ $form.startTime.error?.message }}
            </Message>
            <Message
                v-if="$form.endTime?.invalid"
                severity="error"
                size="small"
                variant="simple"
            >
                {{ $form.endTime.error?.message }}
            </Message>

            <FloatLabel variant="on" class="float-label">
                <Select
                    name="catSelect"
                    v-model="category"
                    :options="categories"
                    input-id="cat-select"
                    class="float-label__select-input"
                >
                    <template #option="slotProps">
                        <CategoryPill
                            :label="slotProps.option.label"
                            :type="slotProps.option.type"
                        />
                    </template>
                    <template #value="slotProps">
                        <CategoryPill
                            v-if="slotProps.value"
                            :label="slotProps.value.label"
                            :type="slotProps.value.type"
                        />
                    </template>
                </Select>
                <label for="cat-select">Category *</label>
            </FloatLabel>
            <Message
                v-if="$form.catSelect?.invalid"
                severity="error"
                size="small"
                variant="simple"
            >
                {{ $form.catSelect.error?.message }}
            </Message>

            <FloatLabel variant="on" class="float-label">
                <InputText
                    name="link"
                    class="float-label__text-input"
                    v-model="link"
                />
                <label for="link">Link</label>
            </FloatLabel>

            <Button
                type="submit"
                :severity="mode === 'new' ? 'success' : 'info'"
                id="create-button"
            >
                {{ mode === "new" ? "Create" : "Edit" }}
            </Button>
        </Form>
    </Dialog>
</template>

<script lang="ts" setup>
import { type ModelRef } from "vue"
import {
    Dialog,
    FloatLabel,
    InputText,
    Button,
    DatePicker,
    Select,
    Message,
    Textarea,
} from "primevue"
import { Form, type FormSubmitEvent } from "@primevue/forms"
import CategoryPill from "./CategoryPill.vue"
import { addToDb, editItemFromDb } from "../idb"
import { DONE_IT_DB } from "../constants"

interface Props {
    mode: "new" | "edit"
    editingId: number | undefined
}
const props = defineProps<Props>()

const visible = defineModel()

const emit = defineEmits([
    "submitted",
    "errorSubmitting",
    "close",
    "edited",
    "errorEditing",
])

interface Category {
    label: string
    type: string
}
const categories: Category[] = [
    { label: "Sprint ticket", type: "sprint-ticket" },
    { label: "PR", type: "pr" },
    { label: "Meeting", type: "meeting" },
    { label: "Infrastructure", type: "infrastructure" },
    { label: "Initiative", type: "initiative" },
    { label: "Huddle", type: "huddle" },
    { label: "On leave", type: "on-leave" },
]

const title = defineModel("title")
const description = defineModel("description")
const startTime = defineModel("startTime")
const endTime = defineModel("endTime")
const category: ModelRef<Category | undefined> = defineModel("category")
const link = defineModel("link")

const resolver = () => {
    let errors = {
        title: [],
        startTime: [],
        endTime: [],
        catSelect: [],
    }

    if (!title.value) {
        errors.title = [{ message: "Title is required" }]
    }

    if (!startTime.value) {
        errors.startTime = [{ message: "Start time is required" }]
    }

    if (!category.value) {
        errors.catSelect = [{ message: "Category is required" }]
    }

    if (endTime.value && startTime.value) {
        if (endTime.value < startTime.value) {
            errors.endTime = [
                { message: "End time must be in the future from start time" },
            ]
        }
    }

    return {
        errors,
    }
}

const createDoneIt = async (formState: FormSubmitEvent) => {
    if (formState.valid) {
        const data = {
            title: title.value,
            description: description.value,
            startTime: startTime.value,
            endTime: endTime.value,
            categoryType: category.value?.type,
            categoryLabel: category.value?.label,
            link: link.value,
        }

        if (props.mode === "new") {
            await addToDb(DONE_IT_DB, data)
                .then(() => {
                    emit("submitted")
                    resetForm()
                })
                .catch((e) => {
                    console.log(e)
                    emit("errorSubmitting")
                })
        } else if (props.editingId) {
            await editItemFromDb(DONE_IT_DB, data, props.editingId)
                .then(() => {
                    emit("edited")
                    resetForm()
                })
                .catch((e) => {
                    console.log(e)
                    emit("errorEditing")
                })
        }
    }
}

const resetForm = () => {
    title.value = ""
    description.value = ""
    startTime.value = undefined
    endTime.value = undefined
    category.value = undefined
    link.value = ""
}

// For better usability, set end time to start time if its already set
const setToStartTime = () => {
    if (startTime.value) {
        endTime.value = startTime.value
    }
}
</script>

<style lang="less" scoped>
@gutter: 16px;

.float-label {
    margin-top: @gutter;
    width: 100%;

    &__text-input {
        width: 600px;
    }

    &__select-input {
        width: 100%;
    }
}

#create-button {
    margin-top: 16px;
    float: right;
}

.time-pickers {
    display: flex;
    gap: @gutter;
}
</style>
