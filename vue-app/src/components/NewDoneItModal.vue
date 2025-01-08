<template>
    <Dialog v-model:visible="visible" modal header="Create new Done It" id="done-it-modal">
        <Form v-slot="$form" @submit="createDoneIt" :resolver="resolver" :validate-on-submit="true">
            <FloatLabel variant="on" class="float-label">
                <InputText name="title" class="float-label__text-input" v-model="title" />
                <label for="title">Title *</label>
            </FloatLabel>
            <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">
                {{ $form.title.error?.message }}
            </Message>

            <FloatLabel variant="on" class="float-label">
                <Textarea name="desc" class="float-label__text-input" v-model="description" />
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
                    />
                    <label for="endTime">End Time</label>
                </FloatLabel>
            </div>
            <Message v-if="$form.startTime?.invalid" severity="error" size="small" variant="simple">
                {{ $form.startTime.error?.message }}
            </Message>

            <FloatLabel variant="on" class="float-label">
                <Select
                    name="catSelect"
                    v-model="category" 
                    :options="categories" 
                    input-id="cat-select" 
                    option-label="name" 
                    class="float-label__select-input" 
                />
                <label for="cat-select">Category *</label>
            </FloatLabel>
            <Message v-if="$form.catSelect?.invalid" severity="error" size="small" variant="simple">
                {{ $form.catSelect.error?.message }}
            </Message>

            <Button type="submit" severity="success" id="create-button">
                Create
            </Button>
        </Form>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { 
    Dialog, 
    FloatLabel, 
    InputText, 
    Button, 
    DatePicker, 
    Select, 
    Message, 
    Textarea
} from "primevue"
import { Form, type FormSubmitEvent, type FormResolverOptions } from '@primevue/forms'

const visible = defineModel()
const emit = defineEmits(['close'])

interface Category {
    name: string
    color: string
}
const categories: Category[] = [
    { name: 'Sprint ticket', color: '#3446eb' },
    { name: 'PR', color: '#7b7c85' },
    { name: 'Meeting', color: '#4cc271' },
    { name: 'Infrastructure', color: '#944cc2' },
    { name: 'Initiative', color: '#c24cba' },
]

const title = ref('')
const description = ref('')
const startTime = ref()
const endTime = ref()
const category = ref()

const resolver = (resolverOptions: FormResolverOptions) => {
    let errors = {
        title: [],
        startTime: [],
        catSelect: []
    }

    if (!resolverOptions.values.title) {
        errors.title = [{ message: 'Title is required' }]
    }

    if (!resolverOptions.values.startTime) {
        errors.startTime = [{ message: 'Start time is required' }]
    }

    if (!resolverOptions.values.catSelect) {
        errors.catSelect = [{ message: 'Category is required' }]
    }

    return {
        errors
    }
}

const createDoneIt = (formState: FormSubmitEvent) => {
    console.log(formState.valid)
    if (formState.valid) {
        emit('close')
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