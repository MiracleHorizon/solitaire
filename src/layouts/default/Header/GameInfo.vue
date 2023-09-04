<script setup lang="ts">
import MovesCount from './MovesCount.vue'
import UserRecords from './UserRecords/UserRecords.vue'
</script>

<template>
  <div :class="$style.root">
    <UserRecords :class="$style.records" />
    <MovesCount />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';
@import '@styles/breakpoints';

.root {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.records {
  margin-right: 20px;

  @media screen and (max-width: $mobileLg) {
    display: none;
  }
}
</style>
