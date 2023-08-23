<script setup lang="ts">
import Header from '@components/Header.vue'
</script>

<template>
  <div :class="$style.root">
    <Header />
  </div>
</template>

<style module lang="scss">
.root {
  width: 100vw;
  height: 100vh;
}
</style>
