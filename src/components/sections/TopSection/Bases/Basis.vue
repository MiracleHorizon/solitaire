<script setup lang="ts">
import Card from '@ui/Card.vue'
import CardCover from '@ui/CardCover.vue'
import { useDragStore } from '@stores/drag.ts'
import { useGameStore } from '@stores/game.ts'
import type { Basis } from '@entities/Basis.ts'

const props = defineProps<{ basis: Basis }>()
const basisId = props.basis.id

const gameStore = useGameStore()
const dragStore = useDragStore()

const isDropAvailable = () => {
  const card = dragStore.card

  if (!card) return

  return gameStore.isDropToBasisAvailable(basisId, card)
}

const handleDrop = () => {
  if (!dragStore.card || !isDropAvailable()) return
  gameStore.addCardToBasis(basisId, dragStore.card.id)
}
</script>

<template>
  <div
    :class="$style.root"
    @dragenter="dragStore.setBasisId(basisId), dragStore.resetColumnId()"
    @dragleave="dragStore.resetBasisId"
    @dragover="isDropAvailable() && $event.preventDefault()"
    @drop.prevent="handleDrop"
  >
    <CardCover />
    <Card
      v-for="card of basis.cards"
      :card="card"
      :draggable="true"
      :class="$style.card"
      @dragstart.stop="dragStore.setCard(card)"
    />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  position: relative;
  width: $card-width;
}

.card {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
