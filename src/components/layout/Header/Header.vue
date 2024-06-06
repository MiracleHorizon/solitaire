<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import LinkBackHome from '@components/LinkBackHome.vue'
import ButtonNewGame from './buttons/ButtonNewGame.vue'
import GameStatistics from './GameStatistics'
import { Route } from '@router/routes'

const route = useRoute()

const isHomeRoute = computed(() => route.path === Route.HOME)
const isGameRoute = computed(() => route.path === Route.GAME)
</script>

<template>
  <header :class="$style.root">
    <LinkBackHome v-if="!isHomeRoute" :class="$style.backHome" />
    <GameStatistics v-if="isGameRoute" />
    <ButtonNewGame v-if="isGameRoute" :class="$style.newGame" />
  </header>
</template>

<style module lang="scss">
@import '@styles/variables';
@import '@styles/breakpoints';

.root {
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  padding: 0 18px;
  background-color: $black;

  @media screen and (max-width: $mobileLg) {
    padding: 0 12px;
  }
}

// Buttons
$small-screen-bp: 600px;

.backHome {
  margin-right: 14px;
}

.newGame {
  margin-left: 12px;

  @media screen and (max-width: $small-screen-bp) {
    margin-left: auto;
  }
}

.toggleSound {
  margin-left: auto;

  @media screen and (max-width: $small-screen-bp) {
    margin-left: 0;
  }
}
</style>
