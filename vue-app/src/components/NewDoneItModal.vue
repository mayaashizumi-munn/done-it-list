<template>
    <Dialog v-model:visible="visible" modal header="Create new Done It" id="done-it-modal">
        <FloatLabel variant="on" class="float-label">
            <InputText id="desc" class="float-label__input" v-model="description" />
            <label for="desc">Description</label>
        </FloatLabel>

        <Button @click="createDoneIt" severity="success" id="create-button">
            Create
        </Button>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog, FloatLabel, InputText, Button } from "primevue"

const visible = defineModel()
const emit = defineEmits(['close'])

const description = ref('')

const createDoneIt = () => {
    emit('close')
}
</script>

<style lang="less" scoped>
.float-label {
    margin-top: 8px;

    &__input {
        width: 600px;
    }
}

#create-button {
    margin-top: 16px;
    float: right;
}
</style>