<script setup lang="ts">
import { useRoute } from 'vue-router'

import GameInfo from './GameInfo.vue'
import { Routes } from '@router/routes.ts'

const route = useRoute()
</script>

<template>
  <header :class="$style.root">
    <GameInfo v-if="route.path === Routes.GAME" />
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
</style>
