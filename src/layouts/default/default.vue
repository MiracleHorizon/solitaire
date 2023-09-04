<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

import Header from './Header/Header.vue'

const handleKeydownPageReload = (ev: KeyboardEvent) => {
  // Защита пользователя от случайных перезагрузок страницы и потери игрового прогресса.
  if ((ev.code === 'KeyR' && ev.metaKey) || ev.code === 'F5') {
    ev.preventDefault()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydownPageReload)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydownPageReload)
})
</script>

<template>
  <div :class="$style.root">
    <Header />
    <slot />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100vw;
  height: 100vh;
  background: url('@images/board_bg.png') $board-green;
}
</style>
