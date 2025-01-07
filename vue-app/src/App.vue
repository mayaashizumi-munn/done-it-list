<template>
    <div>
        Done It App
        <button @click="openDoneItModal">Create new Done It</button>

        <NewDoneItModal v-if="modalOpen" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import NewDoneItModal from "./components/NewDoneItModal.vue";

const modalOpen = ref(false)

const openDoneItModal = () => {
    modalOpen.value = true
}
</script>

<style scoped>
</style>
