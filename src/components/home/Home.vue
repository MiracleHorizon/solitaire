<script setup lang="ts">
import PlayGame from '@components/home/PlayGame.vue'
</script>

<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <h1>Пасьянс "Косынка"</h1>
    </header>
    <main :class="$style.content">
      <PlayGame />
    </main>
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
}

.header {
  width: 100%;
  padding-top: 24px;
  text-align: center;

  h1 {
    font-size: 38px;
    font-weight: 500;
    color: $white;
  }
}

.content {
}
</style>
