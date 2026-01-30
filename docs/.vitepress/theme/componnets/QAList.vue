<template>
    <div class="my-6 flex flex-col gap-3">
        <div
            v-for="entry in allWithIndex"
            :key="entry.index"
            class="p-2 overflow-hidden rounded-lg border bg-(--vp-c-bg-soft) transition-all duration-300"
            :class="[
                isOpen(entry.index)
                    ? 'border-(--vp-c-brand-1) shadow-sm'
                    : 'border-(--vp-c-divider) hover:border-(--vp-c-brand-1)'
            ]"
        >
            <button
                type="button"
                class="flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent text-left outline-none"
                @click="toggle(entry.index)"
                :aria-expanded="isOpen(entry.index)"
            >
                <span
                    class="p-1 text-sm font-semibold leading-relaxed transition-colors duration-300"
                    :class="isOpen(entry.index) ? 'text-(--vp-c-brand-1)' : 'text-(--vp-c-text-1)'"
                >
                    {{ entry.item.question }}
                </span>
                <span
                    class="h-5 w-5 shrink-0 transition-all duration-300"
                    :class="isOpen(entry.index) ? 'rotate-180 text-(--vp-c-brand-1)' : 'text-(--vp-c-text-3)'"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </span>
            </button>

            <div
                class="grid transition-all duration-300 ease-in-out"
                :class="isOpen(entry.index) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
            >
                <div class="overflow-hidden">
                    <div class="p-2 text-[0.9rem] leading-relaxed text-(--vp-c-text-2) whitespace-pre-wrap">
                        {{ entry.item.answer }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div
            v-if="allWithIndex.length === 0"
            class="rounded-lg border border-dashed border-(--vp-c-divider) p-10 text-center text-sm text-(--vp-c-text-3)"
        >
            暂无内容 / No Content
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, type PropType } from 'vue';

interface QAItem {
    question: string;
    answer: string;
}

const props = defineProps({
    items: {
        type: Array as PropType<QAItem[]>,
        default: () => [],
    },
    accordion: {
        type: Boolean,
        default: true,
    },
    initialOpen: {
        type: [Number, Array] as PropType<number | number[] | null>,
        default: null,
    },
});

const openSet = ref(new Set<number>());

function setInitialOpen() {
    openSet.value.clear();
    if (props.initialOpen == null) return;
    if (Array.isArray(props.initialOpen)) {
        props.initialOpen.forEach((i: number) => openSet.value.add(i));
    } else {
        openSet.value.add(Number(props.initialOpen));
    }
}

setInitialOpen();
watch(() => props.initialOpen, setInitialOpen);

const allWithIndex = computed(() => props.items.map((item, index) => ({ item, index })));

function toggle(idx: number) {
    if (props.accordion) {
        if (openSet.value.has(idx)) {
            openSet.value.delete(idx);
        } else {
            openSet.value.clear();
            openSet.value.add(idx);
        }
    } else {
        if (openSet.value.has(idx)) openSet.value.delete(idx);
        else openSet.value.add(idx);
    }
}

function isOpen(idx: number) {
    return openSet.value.has(idx);
}
</script>

<style scoped>
/* 确保 CSS Grid 展开动画在任意环境下都能正确计算高度 */
.grid-rows-\[0fr\] {
    grid-template-rows: 0fr;
}
.grid-rows-\[1fr\] {
    grid-template-rows: 1fr;
}
</style>
