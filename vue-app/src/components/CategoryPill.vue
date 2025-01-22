<template>
    <div :class="['category-pill', `category-pill__${props.type}`]">
        {{ props.label }}
    </div>
</template>

<script lang="ts" setup>
interface Props {
    label: string
    type: string
}
const props = defineProps<Props>()
</script>

<style lang="less" scoped>
.category-pill {
    border: 1px solid white;
    border-radius: 20px;
    padding: 2px 8px;
    width: fit-content;
    height: fit-content;
    color: white;

    &__sprint-ticket {
        background: rgba(#3446eb, 0.3);
        border: 1px solid #3446eb;
    }

    &__pr {
        background: rgba(#7b7c85, 0.3);
        border: 1px solid #7b7c85;
    }

    &__meeting {
        background: rgba(#4cc271, 0.3);
        border: 1px solid #4cc271;
    }

    &__infrastructure {
        background: rgba(#944cc2, 0.3);
        border: 1px solid #944cc2;
    }

    &__initiative {
        background: rgba(#c24cba, 0.3);
        border: 1px solid #c24cba;
    }

    &__huddle {
        background: rgba(#c27d4c, 0.3);
        border: 1px solid #c27d4c;
    }

    &__on-leave {
        background: rgba(#4cc2ac, 0.3);
        border: 1px solid #4cc2ac;
    }
}
</style>
