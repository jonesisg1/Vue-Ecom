<template>
    <div class="products-grid pt-1 gap-3">
    <PrimeCard v-for="bike in bikes">
        <template #title>
            <img :src="useAsset('Procaliber8.jpg')" style="max-width: 100%">
        </template>
        <template #content>
            <h3>{{ bike.model_name }} </h3>
            <div v-for="(value, key) in bike">
                <span v-if="show.includes(key)">
                    <strong>{{ titleCase(key) }}</strong> - {{ (Array.isArray(value)) ? prettyFyArray(value) : value }} 
                </span>
            </div>
            <div class="pt-3"><strong>£ {{ bike.price/100 }}</strong></div>
        </template>
    </PrimeCard>
    </div>
</template>

<script setup lang="ts">
// Assets should be auto imported!
import type { Bike, SizesOptions } from '../types';

defineProps<{
  bikes: Bike[]
}>()

const show = ['brand', 'frame_material', 'wheel_size', 'fork_travel' ]
const initCaps = (string: string) => string[0].toUpperCase() + string.slice(1).toLowerCase()
const titleCase = ( label: string ) => {
    return label.split('_').map((w)=>initCaps(w)).join(' ')
}
const prettyFyArray = (sizeOptiops: SizesOptions[]) => {
    let arrayStr = ''
    for (const size of sizeOptiops) {
            for (const [key, value] of Object.entries(size)) {
                arrayStr += (value[0] === '*') ? ` ${key}` : `, ${key}: (${value})`
        }
    }
    return arrayStr.slice(1)
}

</script>

<style lang="scss">
.products-grid {
    --minChildWidth: 300px;
    display: grid;
    grid-template-columns: 
        repeat(auto-fit,
        minmax(min(var(--minChildWidth),100%),
               1fr));
    flex-grow: 9999;
    flex-basis: var(--minChildWidth);
}
</style>
