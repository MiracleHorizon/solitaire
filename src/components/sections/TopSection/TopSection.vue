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
.root {
  display: flex;
  justify-content: space-between;
}
</style>
