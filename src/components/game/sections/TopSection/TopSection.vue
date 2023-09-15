<script setup lang="ts">
import CardsReserve from './CardsReserve.vue'
import CardsBases from './Bases/CardsBases.vue'
</script>

<template>
  <section :class="$style.root">
    <CardsReserve />
    <CardsBases />
  </section>
</template>

<style module lang="scss">
@import '@styles/variables';

$height: $card-height;

.root {
  height: $height;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: $small-content-max-width-bp) {
    height: $small-card-height;
  }
}
</style>
