<template>
    <header class="done-it-header">
        <h1>Done It ✅</h1>
        <Button
            id="add-done-it-button"
            icon="pi pi-list-check"
            label="New Done It"
            raised
            @click="openDoneItModal('new')" 
        />
    </header>

    <ToDoList 
        :loading="loadingTodos" 
        :todos="todos" 
        @refresh-todos="loadTodosFromDb()"
        @delete-todo="(todoId: number) => deleteTodo(todoId)"
        @mark-completed="(todo: ToDo) => convertTodoToDoneIt(todo)"
    />

    <hr />

    <DoneItList 
        :loading="loadingDoneIts" 
        :done-its="doneIts" 
        @refresh-done-its="loadDoneItsFromDb"
        @edit-done-it="editDoneIt"
    />

    <DoneItModal
        v-model:visible="modalVisible"
        v-model:title="doneItModalTitle"
        v-model:description="doneItModalDesc"
        v-model:start-time="doneItModalStart"
        v-model:end-time="doneItModalEnd"
        v-model:category="doneItModalCategory"
        v-model:link="doneItModalLink"
        :mode="doneItModalMode"
        :editing-id="doneItEditingId"
        @submitted="onDoneItSubmit"
        @edited="onDoneItEdited"
        @error-submitting="onDoneItSubmitFailed"
        @error-editing="onDoneItEditFailed"
        @close="resetModalValues"
    />

    <Toast />
    <ConfirmPopup />

    <footer>
        Made with <i class="pi pi-heart" style="font-size: 10px" /> by Maya
    </footer>
</template>

<script setup lang="ts">
import { ref, type Ref, onBeforeMount } from "vue"
import Button from "primevue/button"
import DoneItModal from "./components/DoneItModal.vue";
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import DoneItList from "./components/DoneItList.vue";
import { deleteFromDb, getAllFromDb } from "./idb";
import type { DoneIt, ToDo } from "./types";
import ConfirmPopup from "primevue/confirmpopup";
import ToDoList from "./components/ToDoList.vue";
import { DONE_IT_DB, TODO_DB } from "./constants";

const toast = useToast();

const modalVisible = ref(false)
const loadingDoneIts = ref(true)
const loadingTodos = ref(true)
const doneIts: Ref<DoneIt[]> = ref([])
const todos: Ref<ToDo[]> = ref([])

const doneItModalMode: Ref<'new'|'edit'> = ref('new')
const doneItEditingId: Ref<number|undefined> = ref(undefined)
const doneItModalTitle = defineModel('title')
const doneItModalDesc = defineModel('desc')
const doneItModalStart = defineModel('start')
const doneItModalEnd = defineModel('end')
const doneItModalCategory = defineModel('category')
const doneItModalLink = defineModel('link')

onBeforeMount(async () => {
    await loadTodosFromDb()
    await loadDoneItsFromDb()
})

const loadDoneItsFromDb = async () => {
    loadingDoneIts.value = true
    doneIts.value = await getAllFromDb(DONE_IT_DB)
    loadingDoneIts.value = false
}

const loadTodosFromDb = async () => {
    loadingTodos.value = true
    todos.value = await getAllFromDb(TODO_DB)
    loadingTodos.value = false
}

const openDoneItModal = (modalMode: 'new'|'edit') => {
    doneItModalMode.value = modalMode
    modalVisible.value = true
}
const onDoneItSubmit = async () => {
    await loadDoneItsFromDb()
    modalVisible.value = false
    toast.add({severity: "success", summary: "Done It Added", detail: 'New done it created', life: 3000})
}

const onDoneItEdited = async () => {
    await loadDoneItsFromDb()
    modalVisible.value = false
    toast.add({severity: "success", summary: "Done It Edited", detail: 'Done it successfully edited', life: 3000})
}

const onDoneItEditFailed = () => {
    toast.add({severity: "error", summary: "Error Editing Done It", detail: 'Please try again', life: 3000})
}

const onDoneItSubmitFailed = () => {
    toast.add({severity: "error", summary: "Error Creating Done It", detail: 'Please try again', life: 3000})
}

const editDoneIt = (doneIt: DoneIt) => {
    doneItModalTitle.value = doneIt.title
    doneItModalStart.value = doneIt.startTime
    doneItModalCategory.value = {label: doneIt.categoryLabel, type: doneIt.categoryType}
    doneItModalDesc.value = doneIt.description ?? ''
    doneItModalEnd.value = doneIt.endTime ?? undefined
    doneItModalLink.value = doneIt.link ?? ''
    doneItEditingId.value = doneIt.id
    openDoneItModal('edit')
}

const deleteTodo = (todoId: number, showToast = true) => {
    deleteFromDb(TODO_DB, todoId).then(() => {
        if (showToast) {
            toast.add({severity: "success", summary: "Todo Removed", detail: 'Deleted successfully', life: 3000})
        }
        loadTodosFromDb()
    }).catch(() => {
        toast.add({severity: "error", summary: "Error deleting todo", detail: 'Please try again', life: 3000})
    })
}

const resetModalValues = () => {
    doneItModalTitle.value = ''
    doneItModalDesc.value = ''
    doneItModalStart.value = undefined
    doneItModalEnd.value = undefined
    doneItModalCategory.value = undefined
    doneItModalLink.value = ''
}

const convertTodoToDoneIt = (todo: ToDo) => {
    doneItModalTitle.value = todo.title
    deleteTodo(todo.id, false)
    openDoneItModal('new')
}
</script>

<style lang="less" scoped>
.done-it-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
