<script setup lang="ts">
import { Route } from '@router/routes.ts'
</script>

<template>
  <RouterLink :to="Route.GAME" :class="$style.root">Начать игру</RouterLink>
</template>

<style module lang="scss">
@use 'sass:color';
@import '@styles/variables';

.root {
  width: 200px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: $white;
  font-weight: 500;
  transition: background 80ms ease;

  &:hover {
    background: color.adjust($white, $lightness: -10%);
  }

  &:active {
    background: color.adjust($white, $lightness: -20%);
  }
}
</style>
