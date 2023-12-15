<template>
  <ProductsBreadCrumbs />
  <div class="main-div container-flow mx-5 mb-4">
  <!-- <div class="container-md mb-4"> -->
    <ProductsDropDownFilters class="drop-downs" @sort-item="sortItems" @toggle-filters="toggleFilters"/>
    <div class="products-with-sidebar">
      <!-- <ProductsFilterBar ref="filter" :class="{'d-none':filtersVisible, unstick:filterIsWide}" @apply-filters="filterItems"/> -->
      <ProductsBikeFilter ref="filter" :class="{'d-none':filtersVisible, unstick:filterIsWide}" @filters-Changed="doFiltering"></ProductsBikeFilter>
      <!-- {{ grid.bikes.length }} -->
      <div class="products-grid-container">
        <!-- <div class="products-grid pt-1 gap-3 ms-3"> -->
            <ProductsBikeCard ref="card" :bikes="slicedBikes"></ProductsBikeCard>
        <!-- </div> -->
        <!-- <ProductsCard :cards="slicedCards" :filter-is-wide="filterIsWide" class="mb-3"/> -->
        <ProductsMoreButton v-if="slicedBikes.length < grid.bikes.length" @increment-cards="grid.showCards += 10" :class="{'ms-3':!filterIsWide}"/>
        <!-- <Notification v-if="slicedCards.length == 0" class="my-5 ms-3 py-5">
          <h4>Sorry, we can't find any products that match your filters.</h4>
        </Notification> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores and composables should be auto imported!
import type { Product, Filters, Bike, BikeFilterState } from '../types';

const bikeData: Bike[] = useBikeData()

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
// const filterIsWide = ref(false)
const filterRight = ref(0)
const cardLeft = ref(0)
const filterIsWide = computed(() => cardLeft.value < filterRight.value)

onMounted(()=>{
  const filterResizeObserver = new ResizeObserver((entries) => {
    // console.log(`Right ${entries[0].target.getBoundingClientRect().right}`)
    //  console.log(entries[0].target.clientWidth)
    // filterIsWide.value = ((entries[0].target.clientWidth > 302)||(entries[0].target.clientWidth === 0)) ? true : false
    filterRight.value = entries[0].target.getBoundingClientRect().right
    // filterIsWide.value = cardLeft.value < filterRight.value
  })
  filterResizeObserver.observe(filter.value.$el);
  const cardResizeObserver = new ResizeObserver((entries) => {
    // console.log(`Left ${entries[0].target.getBoundingClientRect().left}`)
    //  console.log(entries[0].target.clientWidth)
    // filterIsWide.value = ((entries[0].target.clientWidth > 302)||(entries[0].target.clientWidth === 0)) ? true : false
    cardLeft.value = entries[0].target.getBoundingClientRect().left
  })
  cardResizeObserver.observe(card.value.$el);
})

const slicedBikes = computed(() => grid.bikes.slice(0, grid.showCards))
const slicedCards = computed(() => grid.cards.slice(0, grid.showCards))

const currentSort = ref('title');
const sortItems = (value: string) => {
  currentSort.value = value
  grid.cards.sort((a, b) => {
    if (value === 'newest') return (a.title === undefined || b.title === undefined) ? 0 : (a.title.length  * 2) - (b.title.length * 4)
    if (value === 'price') return (a.price === undefined || b.price === undefined) ? 0 :(a.price - b.price)
    if (value === 'title') {
      if (a.title === undefined || b.title === undefined) return 0
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
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
            const key = filter.split(' ').join('_').toLocaleLowerCase()
            //   console.log(bike[key])
            if (Array.isArray(bike[key])) {
                match = bike[key].some((r)=>{
                    for (const key in r) {
                        return filterList[filter].some((s)=>{
                            return key == s;
                        })
                    }
                })
                // match = filterList[filter].some(r=> bike[key].includes(r))
            } else {
                match = filterList[filter].includes(bike[key])
            }
            if (match === false) return false
        }
    }
    return match
  })
}

const filterItems = (filterList: Filters) => {
   grid.cards = store.items.filter((card) => {
    return  (
      (filterList.types.includes(card.type||'') || filterList.types.length === 0) &&
      (filterList.colors.includes(card.color||'') || filterList.colors.length === 0) &&
      (((card.price || 0) > filterList.minPrice) && ((card.price || 0) < filterList.maxPrice))
    )
  })

  grid.showCards = 10
  sortItems(currentSort.value)
}

const filtersVisible = ref(false)
const toggleFilters = (value: string) => {
  filtersVisible.value = (value === 'HIDDEN') ? true : false
}

</script>

<style>

.products-with-sidebar {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-basis: 350px;
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
    .products-grid {
        margin-left: 0 !important;
    }
    .main-div {
        margin-left: 1rem !important;
        margin-right: 1rem !important;
    }
}

</style>
