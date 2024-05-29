<script setup lang="ts">
import IconCog from '@ui/icons/IconCog.vue'
import { Route } from '@router/routes.ts'
</script>

<template>
  <RouterLink :class="$style.root" :to="Route.SETTINGS">
    <IconCog />
  </RouterLink>
</template>

<style module lang="scss">
@import '@styles/variables';

$size: 32px;

.root {
  cursor: pointer;
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
