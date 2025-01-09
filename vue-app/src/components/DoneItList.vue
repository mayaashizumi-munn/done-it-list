<template>
    <div v-if="!loading && props.doneIts?.length" id="done-it-dates-list">
        <div class="done-it-date" v-for="date in organisedByDate" :key="date.date">
            {{ date.date }}

            <div class="done-it-item" v-for="doneIt in date.doneIts">
                <span class="done-it-item-section__time">
                    {{ getFormattedTime(doneIt.startTime) }}
                    <span v-if="doneIt.endTime">
                        - {{ getFormattedTime(doneIt.endTime) }}
                    </span>
                </span>
                
                <span class="done-it-item-section__category">
                    <CategoryPill :type="doneIt.categoryType" :label="doneIt.categoryLabel" />
                </span>

                <span>
                    {{ doneIt.title }}
                </span>
                <span v-if="doneIt.description">
                    {{ doneIt.description }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue'
import type { DoneIt, DoneItDate } from '../types'
import CategoryPill from './CategoryPill.vue'

interface Props {
    loading: boolean
    doneIts: DoneIt[]
}
const props = defineProps<Props>()

const organisedByDate: ComputedRef<DoneItDate[]> = computed(() => {
    return props.doneIts?.reduce((result: DoneItDate[], item) => {
        const date = item.startTime?.toDateString()
        const existingGroup = result.find(group => group.date === date)

        if (existingGroup) {
            existingGroup.doneIts.push(item)
        } else {
            result.push({ date, doneIts: [item] })
        }

        return result
    }, [])
})

const getFormattedTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}
</script>

<style lang="less" scoped>
#done-it-dates-list {
    width: 100%;
}

.done-it-date {
    width: 100%;
    text-align: start;
}

.done-it-item {
    border: 1px solid black;
    display: flex;
    width: 100%;
}

.done-it-item-section {
    &__time {
        width: 90px;
    }

    &__category {
        display: flex;
        align-items: center;
        padding: 0 8px;
    }
}

</style>