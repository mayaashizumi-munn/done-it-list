<template>
    <div>
        Done It App
        <br />
        <Button @click="openDoneItModal">Create new Done It</Button>

        <NewDoneItModal
            v-model:visible="modalVisible"
            @submitted="onDoneItSubmit"
            @error-submitting="onDoneItSubmitFailed"
        />

        <Toast />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Button } from "primevue"
import NewDoneItModal from "./components/NewDoneItModal.vue";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const modalVisible = ref(false)

const openDoneItModal = () => {
    modalVisible.value = true
}
const onDoneItSubmit = () => {
    modalVisible.value = false
    toast.add({severity: "success", summary: "Done It Added", detail: 'New done it created', life: 3000})
}

const onDoneItSubmitFailed = () => {
    toast.add({severity: "error", summary: "Error Creating Done It", detail: 'Please try again', life: 3000})
}
</script>

<style scoped>
</style>
