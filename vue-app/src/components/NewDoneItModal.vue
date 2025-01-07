<template>
    <Dialog v-model:visible="visible" modal header="Create new Done It" id="done-it-modal">
        <FloatLabel variant="on" class="float-label">
            <label for="desc">Description</label>
            <InputText id="desc" class="float-label__text-input" v-model="description" />
        </FloatLabel>

        <div class="time-pickers">
            <FloatLabel variant="on" class="float-label">
                <label for="start-time">Start Time</label>
                <DatePicker
                    v-model="startTime"
                    id="start-time"
                    showTime
                    hourFormat="12"
                    fluid
                />
            </FloatLabel>

            <FloatLabel variant="on" class="float-label">
                <label for="end-time">End Time</label>
                <DatePicker
                    v-model="endTime"
                    id="end-time"
                    showTime
                    hourFormat="12"
                    fluid
                />
            </FloatLabel>
        </div>


        <Button @click="createDoneIt" severity="success" id="create-button">
            Create
        </Button>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog, FloatLabel, InputText, Button, DatePicker } from "primevue"

const visible = defineModel()
const emit = defineEmits(['close'])

const description = ref('')
const startTime = ref()
const endTime = ref('-')

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