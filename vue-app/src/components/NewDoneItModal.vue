<template>
    <Dialog v-model:visible="visible" modal header="Create new Done It" id="done-it-modal">
        <FloatLabel variant="on" class="float-label">
            <InputText id="desc" class="float-label__text-input" v-model="description" />
            <label for="desc">Description</label>
        </FloatLabel>

        <div class="time-pickers">
            <FloatLabel variant="on" class="float-label">
                <DatePicker
                    v-model="startTime"
                    id="start-time"
                    showTime
                    hourFormat="12"
                    fluid
                />
                <label for="start-time">Start Time</label>
            </FloatLabel>

            <FloatLabel variant="on" class="float-label">
                <DatePicker
                    v-model="endTime"
                    id="end-time"
                    showTime
                    hourFormat="12"
                    fluid
                />
                <label for="end-time">End Time</label>
            </FloatLabel>
        </div>

        <FloatLabel variant="on" class="float-label">
            <Select v-model="category" :options="categories" input-id="cat-select" option-label="name" class="float-label__select-input" />
            <label for="cat-select">Category</label>
        </FloatLabel>

        <Button @click="createDoneIt" severity="success" id="create-button">
            Create
        </Button>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog, FloatLabel, InputText, Button, DatePicker, Select } from "primevue"

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

const description = ref('')
const startTime = ref()
const endTime = ref('-')
const category = ref()

const createDoneIt = () => {
    emit('close')
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