<template>
    <div class="products-grid pt-1 gap-3">
    <PrimeCard v-for="bike in bikes">
        <template #title>
            <!-- <img :src="useAsset('Procaliber8.jpg')" style="max-width: 100%"> -->
            <NuxtImg :src="`${bike.brand.toLocaleLowerCase()}/${bike.img_src}.webp`" style="max-width: 100%"/>
        </template>
        <template #content>
            <h3>{{ bike.model_name }} </h3>
            <div v-for="(value, key) in bike">
                <span v-if="show.includes(key)">
                    <strong>{{ titleCase(key) }}</strong> - {{ (Array.isArray(value)) ? prettyFyArray(value) : value }} 
                </span>
            </div>
            <div v-if="bike.book_price_from === bike.best_price" class="pt-3"><strong>£{{ bike.book_price_from/100 }}</strong></div>
            <div v-else class="pt-3"><strong><s>£{{ bike.book_price_from }} </s> <span class="sale">Sale £{{bike.best_price/100 }}</span></strong></div>
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

const show = ['brand', 'frame_material', 'wheel_size', 'rear_travel', 'fork_travel', 'sizes_in_stock' ]
const initCaps = (string: string) => string[0].toUpperCase() + string.slice(1).toLowerCase()
const titleCase = ( label: string ) => {
    return label.split('_').map((w)=>initCaps(w)).join(' ')
}
const prettyFyArray = (sizeOptiops: SizesOptions[]|string[]) => {
    let arrayStr = ''
    for (const size of sizeOptiops) {
        if (typeof size === 'object') {
            for (const [key, value] of Object.entries(size)) {
                arrayStr += (value[0] === '*') ? ` ${key}` : `, ${key}: (${value})`
            }
        } else { // For sizes in stock
            arrayStr += `, ${size}`
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

.sale {
    color: #FF0000;
}
</style>
