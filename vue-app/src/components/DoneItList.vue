<template>
    <div v-if="!loading && props.doneIts?.length" id="done-it-dates-list">
        <div class="done-it-date" v-for="date in organisedByDate" :key="date.date">
            <h4>{{ date.date }}</h4>

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

                <div class="done-it-item-section__summary">
                    <p class="done-it-item-section__summary__title">
                        {{ doneIt.title }}
                    </p>
                    <p v-if="doneIt.description" class="done-it-item-section__summary__desc">
                        {{ doneIt.description }}
                    </p>
                    <p v-if="doneIt.link" class="done-it-item-section__summary__link">
                        <a :href="doneIt.link">
                            {{ doneIt.link }}
                        </a>
                    </p>
                </div>
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

    return dates.sort((a, b) => a.time.getTime() - b.time.getTime())
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
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 32px;
}

.done-it-item {
    border: 1px solid black;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    padding: 12px 16px;
    display: flex;
    gap: 20px;
    width: 100%;
    align-items: center;
}

.done-it-item-section {
    &__time {
        width: 80px;
    }

    &__category {
        display: flex;
        align-items: center;
        width: 120px;
    }

    &__summary {
        p {
            margin: 0;
        }

        &__title {
            font-size: 20px;
        }

        &__desc, &__link {
            font-size: 12px;
        }
    }
}

</style>