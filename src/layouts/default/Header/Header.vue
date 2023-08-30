<script setup lang="ts">
import { useRoute } from 'vue-router'

import NewGame from './NewGame.vue'
import { useGameStore } from '@stores/game.ts'
import { Routes } from '@router/routes.ts'

const route = useRoute()
const gameStore = useGameStore()
</script>

<template>
  <header :class="$style.root">
    <ul v-if="route.path === Routes.GAME">
      <li>
        Счетчик ходов:<span>{{ gameStore.movesCount }}</span>
      </li>
      <NewGame :class="$style.newGame" />
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
      @include no-select;
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

.newGame {
  margin-left: 12px;
}
</style>
