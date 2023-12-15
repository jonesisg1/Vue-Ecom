<script lang="ts" setup>
import type { BikeFilterSelection, BikeFilterState } from '../types';

    const emit = defineEmits<{
        (e: 'filtersChanged', filters: BikeFilterState): void,
    }>()

    const filterData = useBikeFilterData()
    let filterState: BikeFilterState = {}
    const filterItems = (filterList: BikeFilterSelection) => {
        // Dynamically build object 
        filterState[filterList.header] = filterList.selection
        emit('filtersChanged', filterState)
    }
    
    // ToDo router.push({ query: newFilterQuery })
</script>

<template>
  <div class="filter-container pt-1">
    <ProductsBikeFilterPanel v-for="(value, key) in filterData" 
      :filter-header="key" :filter-options="value" @filter-changed="filterItems">
    </ProductsBikeFilterPanel>
  </div>
</template>

<style scoped>
.filter-container {
  flex-basis: 250px;
  flex-grow: 1;
  position: sticky;
  top: 125px;
  align-self: start;
  z-index: 90;
}
</style>
