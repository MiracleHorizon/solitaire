<script setup lang="ts">
import Reserve from './Reserve.vue'
import Bases from './Bases/Bases.vue'
</script>

<template>
  <section :class="$style.root">
    <Reserve />
    <Bases />
  </section>
</template>

<style module lang="scss">
@import '@styles/variables';

$height: $card-height;

.root {
  height: $height;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (max-width: $small-content-max-width-bp) {
    height: $small-card-height;
    margin-top: 10px;
  }
}
</style>
