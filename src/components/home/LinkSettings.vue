<script setup lang="ts">
import IconCog from '@ui/icons/IconCog.vue'
import { Routes } from '@router/routes.ts'
</script>

<template>
  <RouterLink :class="$style.root" :to="Routes.SETTINGS">
    <IconCog />
  </RouterLink>
</template>

<style module lang="scss">
@import '@styles/variables';

$size: 32px;

.root {
  cursor: pointer;
  position: fixed;
  left: 16px;
  bottom: 16px;
  width: $size;
  height: $size;
  color: $white;
  transition: rotate 0.7s ease-in-out;

  &:hover {
    rotate: 180deg;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
