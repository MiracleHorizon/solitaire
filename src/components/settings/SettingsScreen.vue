<script setup lang="ts">
import GameCardStylePicker from './GameCardStylePicker.vue'
</script>

<template>
  <div :class="$style.root">
    <main>
      <GameCardStylePicker />
    </main>
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: calc(100% - $header-height);
}
</style>
