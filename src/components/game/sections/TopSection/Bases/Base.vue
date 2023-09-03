<script setup lang="ts">
import Card from '@components/game/Card.vue'
import CardCover from '@ui/CardCover.vue'
import type { Base } from '@entities/Base.ts'

defineProps<{ base: Base }>()
</script>

<template>
  <div :data-base-id="base.id" :data-droppable="true" :class="$style.root">
    <CardCover />
    <Card v-for="card of base.cards" :card="card" :class="$style.card" />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  position: relative;
  width: $card-width;
}

.card {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
