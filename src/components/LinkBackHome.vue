<script setup lang="ts">
import IconArrowLeft from '@ui/icons/IconArrowLeft.vue'
import { Route } from '@router/routes'
</script>

<template>
  <RouterLink :to="Route.HOME" :class="$style.root">
    <IconArrowLeft />
  </RouterLink>
</template>

<style module lang="scss">
@import '@styles/variables';

$size: 28px;

.root {
  min-width: $size;
  color: $white;
  opacity: 70%;
  transition: opacity 80ms ease-in;

  svg {
    width: $size;
    height: $size;
  }

  &:hover {
    opacity: 100%;
  }
}
</style>
