<script setup lang="ts">
import Board from './Board.vue'
</script>

<template>
  <div :class="$style.root">
    <Board @contextmenu.prevent />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: calc(100% - $header-height);
}
</style>
