<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <button :class="$style.root">
    <slot />
    <span :class="$style.title">{{ title }}</span>
  </button>
</template>

<style module lang="scss">
@import '@styles/variables';

$small-screen-bp: 600px;

.root {
  cursor: pointer;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 10px;
  opacity: 80%;
  color: $white;
  transition: opacity 50ms ease-in-out;

  &:hover {
    opacity: 100%;
  }
}

.title {
  margin-left: 8px;
  font-size: 17px;
  font-weight: 500;

  @media screen and (max-width: $small-screen-bp) {
    display: none;
  }
}
</style>
