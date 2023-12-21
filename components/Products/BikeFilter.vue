<script lang="ts" setup>
import type { BikeFilterSelection, BikeFilterState } from '../types';

const router = useRouter()
const filterData = useBikeFilterData() // Filter definitions from database.

const emit = defineEmits<{
    (e: 'filtersChanged', filters: BikeFilterState): void,
}>()

const min:number = 0
const max:number = 20000
const priceFilters = ref<number[]>([min, max])

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
    priceFilters.value = filterState['Price'] as number[]
}

onMounted(() => emit('filtersChanged', filterState))

const filterItems = (filterList: BikeFilterSelection) => {
    filterState[filterList.header] = filterList.selection
    emit('filtersChanged', filterState)
    router.push({ query: filterState })
}

const filterOnPrice = () => {
    if (priceFilters.value[0] === min && priceFilters.value[1] === max) {
        filterState['Price'] = []
    } else {
        filterState['Price'] = priceFilters.value
    }
    emit('filtersChanged', filterState)
    router.push({ query: filterState })
}

const resetPriceFilters = () => {
    priceFilters.value = [min,max]
    filterOnPrice()
}
</script>

<template>
    <div class="filter-container pt-1">
        <PrimePanel toggleable class="pb-2">
            <template #header>
                <h5>Price</h5>
            </template>
            <div class="d-flex justify-content-between mb-2">
                <label>£{{ priceFilters[0] }}</label>
                <label>£{{ priceFilters[1] }}</label>
            </div>
            <PrimeSlider v-model="priceFilters" range :min=min :max=max @slideend="filterOnPrice" />
            <template #icons>
                <button class="p-panel-header-icon p-link mr-2" @click="resetPriceFilters" :class="{'d-none':priceFilters[0]=== min && priceFilters[1] === max}">
                    <span class="pi pi-filter-slash"></span>
                </button>
            </template>
        </PrimePanel>    
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
