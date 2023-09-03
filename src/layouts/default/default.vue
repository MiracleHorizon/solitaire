<script setup lang="ts">
import Header from './Header/Header.vue'
</script>

<template>
  <div :class="$style.root">
    <Header />
    <slot />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100vw;
  height: 100vh;
  background: url('@images/board_bg.png') $board-green;
}
</style>
