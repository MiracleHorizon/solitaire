<script setup lang="ts">
import Header from '@components/Header.vue'
import Board from '@components/Board.vue'
</script>

<template>
  <div :class="$style.root">
    <Header />
    <Board />
  </div>
</template>

<style module lang="scss">
.root {
  width: 100vw;
  height: 100vh;
}
</style>
