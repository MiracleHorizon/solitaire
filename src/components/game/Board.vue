<script setup lang="ts">
import TopSection from './sections/TopSection/TopSection.vue'
import BottomSection from './sections/BottomSection/BottomSection.vue'
</script>

<template>
  <main :class="$style.root">
    <TopSection />
    <BottomSection />
  </main>
</template>

<style module lang="scss">
@import '@styles/breakpoints';

.root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 24px;
  padding-left: 18px;
  padding-right: 18px;

  @media screen and (max-width: $tablet) {
    padding-left: 14px;
    padding-right: 14px;
  }

  @media screen and (max-width: $mobileLg) {
    padding-left: 10px;
    padding-right: 10px;
  }

  section {
    width: 90vw;
    max-width: 1200px;
    height: max-content;
  }
}
</style>
