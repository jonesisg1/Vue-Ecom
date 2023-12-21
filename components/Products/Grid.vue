<template>
  <ProductsBreadCrumbs />
  <div class="main-div container-flow mx-5 mb-4">
    <ProductsDropDownFilters class="drop-downs" :class="{unstick:(store.filtersVisible) ? filterIsWide : true}"  @sort-item="sortItems" @toggle-filters="toggleFilters"/>
    <div class="products-with-sidebar">
      <ProductsBikeFilter ref="filter" :class="{'d-none':!store.filtersVisible, unstick:filterIsWide, 'side-bar':!filterIsWide}" @filters-Changed="doFiltering"></ProductsBikeFilter>
      <!-- {{ grid.bikes }} -->
      <div class="products-grid-container">
        <ProductsBikeCard ref="card" :class="{'ms-3':(store.filtersVisible) ? !filterIsWide : false}" :bikes="slicedBikes"></ProductsBikeCard>
        <ProductsMoreButton v-if="slicedBikes.length < grid.bikes.length" @increment-cards="grid.showCards += 10" class="mt-3" :class="{'ms-3':(store.filtersVisible) ? !filterIsWide : false}"/>
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
    if (value === 'price') return (a.book_price_from === undefined || b.book_price_from === undefined) ? 0 :(a.book_price_from - b.book_price_from)
    if (value === 'title') {
      // if (a.title === undefined || b.title === undefined) return 0
      // if (a.title < b.title) return -1
      // if (a.title > b.title) return 1
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

// const filtersVisible = ref(false)

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
    .products-grid {
        margin-left: 0 !important;
    }
    .main-div {
        margin-left: 1rem !important;
        margin-right: 1rem !important;
    }
}

</style>
