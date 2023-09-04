<script setup lang="ts">
import { useRoute } from 'vue-router'

import GameInfo from './GameInfo.vue'
import NewGameButton from './buttons/NewGameButton.vue'
import ToggleSoundButton from './buttons/ToggleSoundButton.vue'
import { Routes } from '@router/routes.ts'

const route = useRoute()
</script>

<template>
  <header :class="$style.root">
    <GameInfo v-if="route.path === Routes.GAME" />
    <NewGameButton :class="$style.newGame" />
    <ToggleSoundButton :class="$style.toggleSound" />
  </header>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: $header-height;
  display: flex;
  align-items: center;
  background-color: $black;
  padding: 0 18px;
}

// Buttons
.newGame {
  margin-left: 12px;

  @media screen and (max-width: 500px) {
    margin-left: auto;
  }
}

.toggleSound {
  margin-left: auto;

  @media screen and (max-width: 500px) {
    margin-left: 0;
  }
}
</style>
