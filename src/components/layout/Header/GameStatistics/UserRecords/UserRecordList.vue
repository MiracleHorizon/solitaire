<script setup lang="ts">
import { computed } from 'vue'

import UserRecordItem from './UserRecordItem.vue'
import { useGameStore } from '@stores/game'

const gameStore = useGameStore()

const records = computed(() => [
  {
    title: 'Сессия',
    value: gameStore.sessionRecord
  },
  {
    title: 'Общее',
    value: gameStore.personalRecord
  }
])
</script>

<template>
  <ul>
    <UserRecordItem
      v-for="{ title, value } in records"
      :key="title"
      :title="title"
      :value="value"
    />
  </ul>
</template>
