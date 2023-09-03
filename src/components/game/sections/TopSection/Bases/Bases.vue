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
.root {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>
