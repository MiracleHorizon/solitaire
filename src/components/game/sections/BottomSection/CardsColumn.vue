<script setup lang="ts">
import BaseCard from '@ui/BaseCard.vue'
import PlayCard from '@components/game/PlayCard.vue'
import type { Column } from '@entities/Column.ts'

defineProps<{ column: Column }>()
</script>

<template>
  <div :data-column-id="column.id" :data-droppable="true" :class="$style.root">
    <BaseCard :class="$style.dropPlace" />
    <PlayCard v-if="!column.isEmpty" :card="column.cards[0]" />
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
