<script setup lang="ts">
defineProps<{
  title: string
  value: number | null
}>()
</script>

<template>
  <li :class="$style.item">
    <span :class="$style.title">{{ title }}:</span>
    <span :class="$style.value">{{ value !== null ? value : '--' }}</span>
  </li>
</template>

<style module lang="scss">
@import '@styles/variables';

.item {
  font-size: 18px;

  &:not(&:last-of-type) {
    margin-bottom: 4px;
  }
}

.title {
  color: $gray;
}

.value {
  margin-left: 6px;
  text-align: center;
  font-weight: 500;
  color: $white;
}
</style>
