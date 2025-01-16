<template>
    <div id="todo-section">
        <h4>Todo List</h4>

        <div class="create-todo">
            <InputText 
                v-model="todoInput" 
                class="create-todo--input"
                placeholder="Add a task..." 
            />
            <Button 
                class="create-todo--submit-button"
                label="New Todo" 
                variant="text" 
                icon="pi pi-plus" 
                aria-label="Create to do item"
                @click="createNewTodo"
            />
        </div>

        <ul class="todo-list">
            <li 
                v-for="todo in todos" 
                :key="todo.id" 
                class="todo-list--item"
            >
                <p>{{ todo.title }}</p>

                <div class="todo-list--item--actions">
                    <Button 
                        icon="pi pi-trash" 
                        variant="text" 
                        rounded 
                        raised 
                        aria-label="Delete todo"
                        severity="danger"
                        @click="(event) => onDeleteClicked(event, todo.id)"
                    />
                    <Button 
                        icon="pi pi-check" 
                        variant="text" 
                        rounded 
                        raised 
                        aria-label="Mark as complete" 
                        severity="success"
                        @click="onMarkComplete(todo)"
                    />
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { addToDb } from '../idb'
import { TODO_DB } from '../constants'
import type { ToDo } from '../types'
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();

interface Props {
    loading: boolean
    todos: ToDo[]
}
const props = defineProps<Props>()

const emit = defineEmits(['refreshTodos', 'deleteTodo', 'markCompleted'])

const todoInput = ref()

const createNewTodo = () => {
    if (todoInput.value?.length > 0) {
        addToDb(TODO_DB, { title: todoInput.value }).then(() => {
            todoInput.value = ''
        })
        emit('refreshTodos')
    }
}

const onDeleteClicked = (event: Event, todoId: number) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to delete this todo?',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger',
        },
        accept: () => {
            emit('deleteTodo', todoId)
        },
    });
}

const onMarkComplete = (todo: ToDo) => {
    emit('markCompleted', todo)
}
</script>

<style lang="less" scoped>
#todo-section {
    margin-bottom: 32px;
}

.create-todo {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;

    &--submit-button {
        flex: 0 0 auto;
    }

    &--input {
        width: 100%;
    }
}

.todo-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &--item {
        border: 1px solid gray;
        border-radius: 8px;
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
            font-size: 16px;
            margin: 0;
        }

        &--actions {
            display: flex;
            gap: 12px;
        }
    }
}
</style>