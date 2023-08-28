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
  padding-top: 24px;
  padding-left: 18px;
  padding-right: 18px;
  background: url('@static/images/board_bg.png') $board-green;

  @media screen and (max-width: $tablet) {
    padding-left: 14px;
    padding-right: 14px;
  }

  @media screen and (max-width: $mobileLg) {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
