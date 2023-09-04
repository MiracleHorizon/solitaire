<script setup lang="ts">
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.root">
    Счетчик ходов:<span :class="$style.count">{{ gameStore.movesCount }}</span>
  </div>
</template>

<style module lang="scss">
@import '@styles/mixins';
@import '@styles/variables';

.root {
  @include no-select;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: $gray;
}

.count {
  font-size: 20px;
  font-weight: 500;
  margin-left: 6px;
  color: $white;
}
</style>
