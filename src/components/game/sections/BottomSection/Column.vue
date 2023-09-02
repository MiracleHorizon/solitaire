<!--TODO: CardCover v-if="props.column.cards.length <= 1"-->

<script setup lang="ts">
import Card from '@components/game/Card.vue'
import CardCover from '@ui/CardCover.vue'
import type { Column } from '@entities/Column.ts'

defineProps<{ column: Column }>()
</script>

<template>
  <div :data-column-id="column.id" :data-droppable="true" :class="$style.root">
    <CardCover :style="{ position: 'absolute' }" />
    <Card v-if="column.cards.length > 0" :card="column.cards[0]" />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: $card-width;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>
