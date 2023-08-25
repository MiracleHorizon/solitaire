<script setup lang="ts"></script>

<template>
  <main :class="$style.root">
    <section></section>
    <section></section>
  </main>
</template>

<style module lang="scss">
@import '@styles/variables';
@import '@styles/breakpoints';

.root {
  width: 100%;
  height: calc(100% - $header-height);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background: url('@static/images/board_bg.png') $board-green;
}
</style>
