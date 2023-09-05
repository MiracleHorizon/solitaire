<script setup lang="ts">
import Base from './Base.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.root">
    <Base v-for="base of gameStore.bases" :key="base.id" :base="base" />
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
