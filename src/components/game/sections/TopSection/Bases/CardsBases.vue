<script setup lang="ts">
import CardsBase from './CardsBase.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.root">
    <CardsBase v-for="base in gameStore.bases" :key="base.id" :base="base" />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

$gap-fix: 2px;

.root {
  display: flex;
  align-items: flex-start;
  column-gap: calc($card-x-gap + $gap-fix);
}
</style>
