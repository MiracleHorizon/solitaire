<script setup lang="ts">
import Basis from './Basis.vue'
import { useGameStore } from '@stores/useGameStore.ts'

const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.root">
    <Basis v-for="basis of gameStore.bases" :key="basis.id" :basis="basis" />
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  column-gap: 20px;
}
</style>
