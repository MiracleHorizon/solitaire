<script setup lang="ts">
import BaseCard from '@ui/BaseCard.vue'
import PlayCard from '@components/game/PlayCard.vue'
import type { Base } from '@entities/Base.ts'

defineProps<{ base: Base }>()
</script>

<template>
  <div :data-base-id="base.id" :data-droppable="true" :class="$style.root">
    <BaseCard />
    <PlayCard
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
  width: $width;

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-width;
  }
}

.card {
  top: 0;
  left: 0;
}
</style>
