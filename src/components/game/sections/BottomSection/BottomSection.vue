<script setup lang="ts">
import Column from './Column.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <section :class="$style.root">
    <Column
      v-for="column of gameStore.columns"
      :key="column.id"
      :column="column"
    />
  </section>
</template>

<style module lang="scss">
.root {
  height: max-content;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  column-gap: 20px;

  @media screen and (max-width: 550px) {
    column-gap: 8px;
  }
}
</style>
