<script setup lang="ts">
import Header from './Header.vue'
import Board from './Board.vue'
</script>

<template>
  <div :class="$style.root">
    <Header />
    <Board />
  </div>
</template>

<style module lang="scss">
.root {
  width: 100%;
  height: 100%;
}
</style>
