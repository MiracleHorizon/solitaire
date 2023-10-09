<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

import GameBoard from './GameBoard.vue'

useEventListener('keydown', (ev: KeyboardEvent) => {
  if (import.meta.env.DEV) return
  // Защита пользователя от случайных перезагрузок страницы и потери игрового прогресса.
  if ((ev.code === 'KeyR' && ev.metaKey) || ev.code === 'F5') {
    ev.preventDefault()
  }
})
</script>

<template>
  <div :class="$style.root">
    <GameBoard @contextmenu.prevent />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: calc(100% - $header-height);
}
</style>
