<script setup lang="ts">
import BasicCard from '@ui/BasicCard.vue'
import GameCard from '@modules/game/GameCard'
import type { Column } from '@entities/Column.ts'

defineProps<{
  column: Column
}>()
</script>

<template>
  <div :data-column-id="column.id" :data-droppable="true" :class="$style.root">
    <BasicCard :class="$style.dropPlace" />
    <GameCard v-if="!column.isEmpty" :card="column.cards[0]" />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  position: relative;
  width: $card-width;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-card-width;
  }
}

.dropPlace {
  position: absolute;
}
</style>
