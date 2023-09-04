<script setup lang="ts">
import Play from '@ui/icons/Play.vue'
import HeaderButton from './HeaderButton.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <HeaderButton @click="gameStore.$reset()" title="Новая игра">
    <Play />
  </HeaderButton>
</template>
