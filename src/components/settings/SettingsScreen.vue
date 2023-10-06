<script setup lang="ts"></script>

<template>
  <div :class="$style.root">
    <main></main>
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: calc(100% - $header-height);
}
</style>
