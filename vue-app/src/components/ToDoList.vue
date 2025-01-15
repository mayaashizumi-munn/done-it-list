<template>
    <div id="todo-list">
        <h4>Todo List</h4>

        <div v-for="todo in todos" :key="todo.id" class="todo-item">
            <Button icon="pi pi-check" size="small" rounded severity="success" />
            <button><i class="pi pi-check" /></button>
            <p>{{ todo.title }}</p>
        </div>

        <Button 
            label="Create new todo" 
            variant="text" 
            icon="pi pi-plus" 
            aria-label="Create to do item"
        />
    </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'

const todos = [
    { id: 0, title: 'Finish todo feature' },
    { id: 1, title: 'Eat cake' },
]
</script>

<style lang="less" scoped>
.todo-item {
    display: flex;
    gap: 12px;
    align-items: center;

    p {
        font-size: 16px;
    }
}
</style>