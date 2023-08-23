<script setup lang="ts">
import { useGameStore } from '@stores/useGameStore.ts'

const gameStore = useGameStore()
</script>

<template>
  <header :class="$style.root">
    <ul>
      <li>
        Счетчик ходов:<span>{{ gameStore.movesCount }}</span>
      </li>
    </ul>
  </header>
</template>

<style module lang="scss">
@import '@styles/mixins';
@import '@styles/variables';
@import '@styles/breakpoints';

.root {
  width: 100%;
  height: $header-height;
  background-color: $black;

  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 24px;

    @media screen and (max-width: $tablet) {
      padding: 0 16px;
    }

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: $gray;

      span {
        font-size: 20px;
        font-weight: 500;
        margin-left: 6px;
        color: $white;
      }
    }
  }
}
</style>
