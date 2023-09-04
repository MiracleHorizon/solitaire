<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

import GameInfo from './GameInfo.vue'
import NewGameButton from './buttons/NewGameButton.vue'
import ToggleSoundButton from './buttons/ToggleSoundButton.vue'
import { Routes } from '@router/routes.ts'

const route = useRoute()

const isGameRoute = computed(() => route.path === Routes.GAME)
</script>

<template>
  <header :class="$style.root">
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
  background-color: $black;
  padding: 0 18px;

  @media screen and (max-width: $mobileLg) {
    padding: 0 12px;
  }
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
