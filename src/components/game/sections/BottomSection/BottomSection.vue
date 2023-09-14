<script setup lang="ts">
import Column from './Column.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <section :class="$style.root">
    <Column
      v-for="column in gameStore.columns"
      :key="column.id"
      :column="column"
    />
  </section>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  height: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: $card-x-gap;
  margin-top: 20px;

  @media screen and (max-width: $small-content-max-width-bp) {
    margin-top: 10px;
  }
}
</style>
