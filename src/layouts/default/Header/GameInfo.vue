<script setup lang="ts">
import MovesCount from './MovesCount.vue'
</script>

<template>
  <div :class="$style.root">
    <MovesCount />
  </div>
</template>

<style module lang="scss">
@import '@styles/mixins';
@import '@styles/variables';
@import '@styles/breakpoints';

.root {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
