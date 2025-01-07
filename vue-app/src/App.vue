<template>
    <div>
        Done It App
        <Button @click="openDoneItModal">Create new Done It</Button>

        <NewDoneItModal v-if="modalOpen" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Button } from "primevue"
import NewDoneItModal from "./components/NewDoneItModal.vue";

const modalOpen = ref(false)

const openDoneItModal = () => {
    modalOpen.value = true
}
</script>

<style scoped>
</style>
