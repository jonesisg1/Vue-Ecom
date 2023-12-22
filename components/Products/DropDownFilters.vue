<template>
    <div  class="d-flex justify-content-between gap-1 py-3 mb-3">
        <button class="btn btn-light" role="button" @click="toggleFilters">
            <span style="color:#f2be00;">{{ (filtersVisible === 'SHOWN')?'HIDE FILTERS' :'SHOW FILTERS' }}</span>
        </button>
        <PrimeScrollTop icon="pi pi-arrow-up" behavior="auto" :pt="{
            root: 'rounded-circle',
            icon: {
                class: 'text-base'
            }
        }"/>
        <div class="dropdown">
            <a class="btn btn-light dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span style="color:#f2be00;">{{ sort }}</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <!-- <li><a class="dropdown-item" @click="sortBy('newest')" >Newest</a></li>
                <li><a class="dropdown-item" @click="sortBy('price-lh')" >Price (Low-High)</a></li>
                <li><a class="dropdown-item" @click="sortBy('price-hl')" >Price (High-Low)</a></li>
                <li><a class="dropdown-item" @click="sortBy('title')" >Title</a></li> -->
                <li v-for="item in dropdownItems">
                    <a class="dropdown-item" @click="sortBy(item)">{{ item.label }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from '#imports';

const sort = ref('CLICK TO SORT')
const filtersVisible = ref('SHOWN')

const dropdownItems = [
    {'label':'Price (Low-High)', 'sort':'price-lh'},
    {'label':'Price (High-Low)', 'sort':'price-hl'},
    {'label':'Model (A-Z)', 'sort':'model-az'},
    {'label':'Model (Z-A)', 'sort':'model-za'},
]

const toggleFilters = () => {
    filtersVisible.value = (filtersVisible.value === 'SHOWN') ? 'HIDDEN' : 'SHOWN'
    emit('toggleFilters', filtersVisible.value)
}

const emit = defineEmits<{
    (e: 'sortItem', name: string): void,
    (e: 'toggleFilters', filterToggle: string): void
}>()

interface DropdownItem {
    label: string,
    sort: string
}
function sortBy(value: DropdownItem): void {
    emit('sortItem', value.sort)
    sort.value = value.label.toUpperCase()
}

</script>

<style scoped>
.d-flex {
  z-index: 95;
  position: sticky;
  top: 56px;
  align-self: start;
  background-color: #F8F8F8;
}
.btn-light {
    color: black !important;
    background: white;
    border-radius: 0 !important;
    border: 1px solid grey !important;
    min-width: max-content;
}

.dropdown-menu>li:hover {
    cursor: pointer;
}
</style>