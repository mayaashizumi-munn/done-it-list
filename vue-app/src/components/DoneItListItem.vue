<template>
    <div
        class="done-it-item"
        @mouseenter="showActions = true"
        @mouseleave="showActions = false"
    >
        <span class="done-it-item-section__time">
            {{ getFormattedTime(doneIt.startTime) }}
            <span v-if="doneIt.endTime">
                - {{ getFormattedTime(doneIt.endTime) }}
            </span>
        </span>

        <span class="done-it-item-section__category">
            <CategoryPill
                :type="doneIt.categoryType"
                :label="doneIt.categoryLabel"
            />
        </span>

        <div class="done-it-item-section__summary">
            <p class="done-it-item-section__summary__title">
                {{ doneIt.title }}
            </p>
            <p
                v-if="doneIt.description"
                class="done-it-item-section__summary__desc"
            >
                {{ doneIt.description }}
            </p>
            <p v-if="doneIt.link" class="done-it-item-section__summary__link">
                <a :href="doneIt.link">
                    {{ doneIt.link }}
                </a>
            </p>
        </div>

        <Transition>
            <div v-if="showActions" class="done-it-item-section__actions">
                <Button
                    icon="pi pi-trash"
                    variant="text"
                    rounded
                    raised
                    aria-label="Delete"
                    severity="danger"
                    @click="onDeleteClicked"
                />
                <Button
                    icon="pi pi-pen-to-square"
                    variant="text"
                    rounded
                    raised
                    aria-label="Edit"
                    severity="info"
                    @click="emit('edit')"
                />
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import type { DoneIt } from "../types"
import { Button } from "primevue"
import CategoryPill from "./CategoryPill.vue"
import { useConfirm } from "primevue/useconfirm"

const confirm = useConfirm()

const showActions = ref(false)

interface Props {
    doneIt: DoneIt
}
const props = defineProps<Props>()

const emit = defineEmits(["delete", "edit"])

const getFormattedTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    })
}

const onDeleteClicked = (event: Event) => {
    confirm.require({
        target: event.currentTarget,
        message: "Are you sure you want to delete this item?",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
        },
        acceptProps: {
            label: "Delete",
            severity: "danger",
        },
        accept: () => {
            emit("delete", props.doneIt.id)
        },
    })
}
</script>

<style lang="less" scoped>
.done-it-item {
    border: 1px solid black;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    padding: 12px 16px;
    display: flex;
    gap: 20px;
    width: 100%;
    min-height: 70px;
    align-items: center;
}

.done-it-item-section {
    &__time {
        width: 85px;
    }

    &__category {
        display: flex;
        align-items: center;
        width: 120px;
    }

    &__summary {
        flex: 5;

        p {
            margin: 0;
        }

        &__title {
            font-size: 20px;
        }

        &__desc,
        &__link {
            font-size: 12px;
        }
    }

    &__actions {
        display: flex;
        gap: 12px;
    }
}
</style>
