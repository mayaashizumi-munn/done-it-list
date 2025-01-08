<template>
    <div class="list">
        <div class="done-it-list-item" v-for="doneit in list" :key="doneit.id">
            {{  doneit }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { getAllFromDb } from '../idb'

const list = ref()

onBeforeMount(async () => {
    list.value = await getAllFromDb('doneit')
})
</script>

<style lang="less" scoped>
.done-it-list-item {
    width: 100%;
    text-align: start;
}
</style>