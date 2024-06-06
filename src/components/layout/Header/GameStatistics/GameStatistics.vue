<script setup lang="ts">
import MovesCount from './MovesCount.vue'
import UserRecordList from './UserRecords/UserRecordList.vue'
</script>

<template>
  <div :class="$style.root">
    <UserRecordList :class="$style.userRecords" />
    <MovesCount />
  </div>
</template>

<style module lang="scss">
@import '@styles/breakpoints';

.root {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.userRecords {
  margin-right: 20px;

  @media screen and (max-width: $tablet) {
    display: none;
  }
}
</style>
