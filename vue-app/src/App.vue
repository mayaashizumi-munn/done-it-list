<template>
        <header class="done-it-header">
            <h1>Done It ✅</h1>
            <Button
                id="add-done-it-button"
                @click="openDoneItModal" 
            >
                + Done It
            </Button>
        </header>

        <DoneItList :loading="loadingDoneIts" :done-its="doneIts" />

        <NewDoneItModal
            v-model:visible="modalVisible"
            @submitted="onDoneItSubmit"
            @error-submitting="onDoneItSubmitFailed"
        />

        <Toast />

        <footer>
            Made with <i class="pi pi-heart" style="font-size: 10px" /> by Maya
        </footer>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue"
import { Button } from "primevue"
import NewDoneItModal from "./components/NewDoneItModal.vue";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import DoneItList from "./components/DoneItList.vue";
import { getAllFromDb } from "./idb";
import type { DoneIt } from "./types";

const toast = useToast();

const modalVisible = ref(false)
const loadingDoneIts = ref(true)
const doneIts: Ref<DoneIt[]> = ref([])

onBeforeMount(async () => {
    await loadDoneItsFromDb()
})

const loadDoneItsFromDb = async () => {
    loadingDoneIts.value = true
    doneIts.value = await getAllFromDb('doneit')
    loadingDoneIts.value = false
}

const openDoneItModal = () => {
    modalVisible.value = true
}
const onDoneItSubmit = async () => {
    await loadDoneItsFromDb()
    modalVisible.value = false
    toast.add({severity: "success", summary: "Done It Added", detail: 'New done it created', life: 3000})
}

const onDoneItSubmitFailed = () => {
    toast.add({severity: "error", summary: "Error Creating Done It", detail: 'Please try again', life: 3000})
}
</script>

<style lang="less" scoped>
.done-it-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#add-done-it-button {
    height: 60px;
}
</style>
