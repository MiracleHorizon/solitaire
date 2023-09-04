<script setup lang="ts">
import Play from '@ui/icons/Play.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <button :class="$style.root" @click="gameStore.$reset()">
    <span :class="$style.icon">
      <Play />
    </span>
    <span :class="$style.text">Новая игра</span>
  </button>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 10px;
  opacity: 0.8;
  transition: opacity 50ms ease-in-out;
  color: $white;

  &:hover {
    opacity: 1;
  }
}

.icon {
  display: inline-block;
  margin-right: 6px;
}

.text {
  font-weight: 500;
  font-size: 17px;
}
</style>
