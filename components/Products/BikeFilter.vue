<script lang="ts" setup>
import type { BikeFilterSelection, BikeFilterState } from '../types';

const router = useRouter()
const filterData = useBikeFilterData() // Filter definitions from database.

const emit = defineEmits<{
    (e: 'filtersChanged', filters: BikeFilterState): void,
}>()

let filterState: BikeFilterState = {}

// Init selections
// ToDo - move this logic to the grid so we can sort off the bat and pass in the filter state.
const route = useRoute()
for (const filterType in route.query) {
    const filterOrFilterArray: string | string[] = route.query[filterType] as string
    if (Array.isArray(filterOrFilterArray)) {
        if (Number.isNaN(Number.parseFloat(filterOrFilterArray[0]))) {
            filterState[filterType] = filterOrFilterArray as string[]
        } else {
            filterState[filterType] = filterOrFilterArray.map(si => Number.parseFloat(si))
        }
    } else {
        if (Number.isNaN(Number.parseFloat(filterOrFilterArray[0]))) {
            filterState[filterType] = [filterOrFilterArray] as string[]
        } else {
            filterState[filterType] = [Number.parseFloat(filterOrFilterArray)] as number[]
        }
    }
}

onMounted(() => emit('filtersChanged', filterState))

const filterItems = (filterList: BikeFilterSelection) => {
    filterState[filterList.header] = filterList.selection
    emit('filtersChanged', filterState)
    router.push({ query: filterState })
}
</script>

<template>
  <div class="filter-container pt-1">
    <ProductsBikeFilterPanel  v-for="(value, key) in filterData" 
        :filter-header="key" :filter-options="value" @filter-changed="filterItems">
    </ProductsBikeFilterPanel>
  </div>
</template>

<style scoped>
.filter-container {
  flex-basis: 350px;
  flex-grow: 1;
  position: sticky;
  top: 125px;
  align-self: start;
  z-index: 90;
}
</style>
