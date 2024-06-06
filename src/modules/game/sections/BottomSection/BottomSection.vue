<script setup lang="ts">
import CardsColumn from './CardsColumn.vue'
import { useGameStore } from '@stores/game'

const gameStore = useGameStore()
</script>

<template>
  <section :class="$style.root">
    <CardsColumn
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
}
</style>
