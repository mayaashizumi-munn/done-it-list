<template>
    <div>
        Done It App
        <br />
        <Button @click="openDoneItModal">Create new Done It</Button>

        <NewDoneItModal
            v-model:visible="modalVisible"
            @close="closeDoneItModal"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Button } from "primevue"
import NewDoneItModal from "./components/NewDoneItModal.vue";

const modalVisible = ref(false)

const openDoneItModal = () => {
    modalVisible.value = true
}
const closeDoneItModal = () => {
    modalVisible.value = false
}
</script>

<style scoped>
</style>
