<script setup lang="ts">
import NewGame from './NewGame.vue'
import MovesCount from './MovesCount.vue'
</script>

<template>
  <ul :class="$style.root">
    <MovesCount />
    <NewGame :class="$style.newGame" />
  </ul>
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

.newGame {
  margin-left: 12px;
}
</style>
