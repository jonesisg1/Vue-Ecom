<template>
    <div class="products-grid pt-1 gap-3 ms-3">
    <PrimeCard v-for="bike in bikes">
        <template #title> {{ bike.model_name }} </template>
        <template #content>
            <img :src="useAsset('Procaliber8.jpg')" style="max-width: 100%">
            <!-- <img :src="useAsset('1.jpg')" style="max-width: 300px;">  -->
            <div v-for="(value, key) in bike">{{ key }} - {{ value }}</div>
        </template>
    </PrimeCard>
    </div>
</template>

<script setup lang="ts">
// Assets should be auto imported!
import type { Bike } from '../types';

defineProps<{
  bikes: Bike[]
}>()

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
