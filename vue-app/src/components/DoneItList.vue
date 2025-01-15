<template>
    <div v-if="!loading && props.doneIts?.length" id="done-it-dates-list">
        <div class="done-it-date" v-for="date in organisedByDate" :key="date.date">
            <h4>{{ date.date }}</h4>

            <DoneItListItem 
                v-for="doneIt in date.doneIts" 
                :key="doneIt.id"
                :done-it="doneIt"
                @delete="deleteDoneIt"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import type { DoneIt, DoneItDate } from '../types'
import DoneItListItem from './DoneItListItem.vue'
import { useToast } from 'primevue/usetoast'
import { deleteFromDb } from '../idb'

const toast = useToast()

interface Props {
    loading: boolean
    doneIts: DoneIt[]
}
const props = defineProps<Props>()

const emit = defineEmits(['refreshDoneIts'])

const organisedByDate: ComputedRef<DoneItDate[]> = computed(() => {
    const dates = props.doneIts?.reduce((result: DoneItDate[], item) => {
        const date = item.startTime?.toDateString()
        const existingGroup = result.find(group => group.date === date)

        if (existingGroup) {
            existingGroup.doneIts.push(item)
            existingGroup.doneIts.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        } else {
            result.push({ date, time: item.startTime, doneIts: [item] })
        }

        return result
    }, [])

    // Sort dates by descending
    return dates.sort((a, b) => b.time.getTime() - a.time.getTime())
})

const deleteDoneIt = (doneItId: number) => {
    deleteFromDb('doneit', doneItId).then(() => {
        toast.add({severity: "success", summary: "Deleted Done It", detail: 'Successfully deleted Done It', life: 3000})
        emit('refreshDoneIts')
    }).catch(() => {
        toast.add({severity: "error", summary: "Failed", detail: 'Failed to deleted Done It', life: 3000})
    })
    
}
</script>

<style lang="less" scoped>
#done-it-dates-list {
    width: 100%;
}

.done-it-date {
    width: 100%;
    text-align: start;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 32px;
}
</style>