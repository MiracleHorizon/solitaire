<script setup lang="ts">
import Card from '@components/game/Card.vue'
import CardCover from '@ui/CardCover.vue'
import type { Base } from '@entities/Base.ts'

defineProps<{ base: Base }>()
</script>

<template>
  <div :data-base-id="base.id" :data-droppable="true" :class="$style.root">
    <CardCover />
    <Card
      v-for="card in base.cards"
      :key="card.id"
      :card="card"
      :class="$style.card"
    />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

$width: $card-width;
$small-width: $small-card-width;

.root {
  position: relative;
  width: $card-width;

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-width;
  }
}

.card {
  top: 0;
}
</style>
