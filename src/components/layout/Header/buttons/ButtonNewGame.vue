<script setup lang="ts">
import Play from '@ui/icons/PlayIcon.vue'
import HeaderButton from './ButtonHeader.vue'
import { useGameStore } from '@stores/game'

const gameStore = useGameStore()
</script>

<template>
  <HeaderButton title="Новая игра" @click="gameStore.$reset()">
    <Play />
  </HeaderButton>
</template>
