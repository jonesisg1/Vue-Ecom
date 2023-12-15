<script lang="ts" setup>
    import type { BikeFilterSelection } from '../types';

    const props = defineProps<{
        filterHeader: string,
        filterOptions: string[]|number[]
    }>()

    const emit = defineEmits<{
        (e: 'filterChanged', filters: BikeFilterSelection): void,
    }>()

    const selection = ref<string[]>([])

    watch([selection], () => emitSelection())

    const emitSelection = () => emit('filterChanged', { header: props.filterHeader, selection: selection.value })

</script>

<template>
    <PrimePanel toggleable class="pb-2">
        <template #header>
            <h5>{{props.filterHeader}}</h5>
        </template>
        <div class="d-flex flex-wrap justify-content-start gap-2">
            <div v-for="(item, index) in props.filterOptions"  class="d-flex">
                <PrimeCheckbox v-model="selection" :inputId="`${item}${index}`" :name="(item.toString())" :value="item" />
                <label :for="`${item}${index}`" class="mx-2"> {{ item }} </label>
            </div>
        </div>
        <template #icons>
            <button class="p-panel-header-icon p-link mr-2" @click="selection = []" :class="{'d-none':selection.length === 0}">
                <span class="pi pi-filter-slash"></span>
            </button>
        </template>
    </PrimePanel>
</template>

<style scoped>
</style>
