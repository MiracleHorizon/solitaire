<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BackHome from './BackHome.vue'
import GameInfo from './GameInfo.vue'
import NewGameButton from './buttons/NewGameButton.vue'
import ToggleSoundButton from './buttons/ToggleSoundButton.vue'
import { Routes } from '@router/routes.ts'

const route = useRoute()

const isHomeRoute = computed(() => route.path === Routes.HOME)
const isGameRoute = computed(() => route.path === Routes.GAME)
</script>

<template>
  <header :class="$style.root">
    <BackHome v-if="!isHomeRoute" :class="$style.backHome" />
    <GameInfo v-if="isGameRoute" />
    <NewGameButton v-if="isGameRoute" :class="$style.newGame" />
    <ToggleSoundButton :class="$style.toggleSound" />
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
