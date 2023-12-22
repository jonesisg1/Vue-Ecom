<template>
  <ProductsBreadCrumbs />
  <div class="main-div container-flow mx-5 mb-4">
    <ProductsDropDownFilters class="drop-downs mx-2" :class="{unstick:(store.filtersVisible) ? filterIsWide : true}"  @sort-item="sortItems" @toggle-filters="toggleFilters"/>
    <div class="products-with-sidebar">
      <ProductsBikeFilter ref="filter" class="mx-2" :class="{'d-none':!store.filtersVisible, unstick:filterIsWide, 'side-bar':!filterIsWide}" @filters-Changed="doFiltering"></ProductsBikeFilter>
      <!-- {{ grid.bikes }} -->
      <div class="products-grid-container">
        <ProductsBikeCard ref="card" class="mx-2" :bikes="slicedBikes"></ProductsBikeCard>
        <ProductsMoreButton v-if="slicedBikes.length < grid.bikes.length" @increment-cards="grid.showCards += 10" class="mt-3 mx-2" />
        <Notification v-if="slicedBikes.length == 0" class="my-5 ms-3 py-5">
          <h4>Sorry, we can't find any products that match your filters.</h4>
        </Notification>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores and composables should be auto imported!
import type { Product, Filters, Bike, BikeFilterState, SizesOptions } from '../types';

const bikeData: Bike[] = useBikeData()

// console.log(bikeData)

interface grid {
  cards: Product[],
  bikes: Bike[],
  showCards: number
}

const store = useMainStore()
const grid: grid = reactive({
  cards: [],
  bikes: bikeData,
  showCards: 10,
})

const filter = ref()
const card = ref() 
const filterRight = ref(0)
const cardLeft = ref(0)
const filterIsWide = computed(() => (filterRight.value === 0) ? false : cardLeft.value < filterRight.value)

onMounted(()=>{
  const filterResizeObserver = new ResizeObserver((entries) => {
    filterRight.value = entries[0].target.getBoundingClientRect().right
  })
  filterResizeObserver.observe(filter.value.$el);
  const cardResizeObserver = new ResizeObserver((entries) => {
    cardLeft.value = entries[0].target.getBoundingClientRect().left
  })
  cardResizeObserver.observe(card.value.$el);
})

const slicedBikes = computed(() => grid.bikes.slice(0, grid.showCards))

const currentSort = ref('title');
const sortItems = (value: string) => {
  currentSort.value = value
  grid.bikes.sort((a, b) => {
    // if (value === 'newest') return (a.title === undefined || b.title === undefined) ? 0 : (a.title.length  * 2) - (b.title.length * 4)
    if (value === 'price-lh') return (a.book_price_from === undefined || b.book_price_from === undefined) ? 0 :(a.book_price_from - b.book_price_from)
    if (value === 'price-hl') return (b.book_price_from === undefined || a.book_price_from === undefined) ? 0 :(b.book_price_from - a.book_price_from)
    if (value === 'model-az') {
      if (a.model_name === undefined || b.model_name === undefined) return 0
      if (a.model_name < b.model_name) return -1
      if (a.model_name > b.model_name) return 1
    }
    if (value === 'model-za') {
      if (b.model_name === undefined || a.model_name === undefined) return 0
      if (b.model_name < a.model_name) return -1
      if (b.model_name > a.model_name) return 1
    }
    return 0
  })
}

const doFiltering = (filterList: BikeFilterState) => {
  console.log(filterList)
  grid.bikes = bikeData.filter((bike: Bike) => {
    let match = true
    for (const filter in filterList) {
        if (filterList[filter].length > 0) {
            // Price filtering is different!
            if (filter === 'Price') {
                const minPrice = filterList[filter][0] as number
                const maxPrice = filterList[filter][1] as number
                match = (bike.best_price >= (minPrice*100) && bike.best_price <= (maxPrice*100))
            } else {
                const key = filter.split(' ').join('_').toLocaleLowerCase() as keyof Bike
                //   console.log(bike[key])
                if (Array.isArray(bike[key])) {
                    const bikePropArray = bike[key] as string[] | number[] | SizesOptions[]
                    if (typeof bikePropArray[0] === 'object') { // Handle Rear / Fork travel and Wheel size format
                        match = bikePropArray.some((r)=>{
                            for (const key in r as any) {
                                return filterList[filter].some((s)=>{
                                    return key == s;
                                })
                            }
                        })
                    } else {
                        match = bikePropArray.some((r)=>{ // Handle Sizes in stock
                            const sizesInStock: string[] = filterList[filter] as string[]
                            return sizesInStock.includes(r as string)
                        })
                    }
                } else {
                    // ToDo fix typescript @ts-ignore
                    // match = filterList[filter].includes((typeof bike[key] == 'number') ? Number.parseFloat(bike[key]): bike[key])
                    // This is a fix but I'd rather it be less wordy!
                    const bikeProp = bike[key] as string
                    if ( typeof bikeProp === 'number') {
                        const filterSelectionOfNumbers = filterList[filter] as number[] 
                        match = filterSelectionOfNumbers.includes(Number.parseFloat(bikeProp))                    
                    } else {
                        const filterSelectionOfStrings = filterList[filter] as string[] 
                        match = filterSelectionOfStrings.includes(bikeProp)
                    }
                }
            }
            if (match === false) return false
        }
    }
    return match
  })
  grid.showCards = 10
  sortItems(currentSort.value)
}

const toggleFilters = () => {
    (store.filtersVisible === true) ? store.hideFilter() : store.showFilter()
    // filter.value.$el.scrollIntoView()
}

</script>

<style>

.products-with-sidebar {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-basis: 350px;
}

.side-bar {
    max-height: calc(100vh - 125px);
    overflow-y: auto;
}

.products-grid-container {
    --minChildWidth: 300px;
    flex-grow: 9999;
    flex-basis: var(--minChildWidth);
}

.unstick {
  position: static !important;
}

@media (max-width: 768px ) {
    /* .products-grid {
        margin-left: 0 !important;
    } */
    .main-div {
        margin-left: 0.25rem !important;
        margin-right: 0.25rem !important;
    }
}

</style>
