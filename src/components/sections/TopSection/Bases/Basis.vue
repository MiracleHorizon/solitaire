<script setup lang="ts">
import Card from '@ui/Card.vue'
import CardCover from '@ui/CardCover.vue'
import { useDragStore } from '@stores/useDragStore.ts'
import { useGameStore } from '@stores/useGameStore.ts'
import type { Basis } from '@entities/Basis.ts'
import type { Card as CardImpl } from '@entities/Card.ts'
import { Rank } from '@app-types/card'

const gameStore = useGameStore()
const dragStore = useDragStore()

const props = defineProps<{ basis: Basis }>()
const basisId = props.basis.id

const handleDragOver = (ev: DragEvent) => {
  const card = dragStore.card

  if (!card) return

  const isBasisEmpty = props.basis.isEmpty
  const lastCard = props.basis.tryToGetLastCard()

  const isEmptyAndAvailable = isBasisEmpty && card.rank === Rank.ACE
  const isNotEmptyAndAvailable =
    !isBasisEmpty && lastCard && isDropAvailable(lastCard, card)

  // 1. Минимальная карта, которую можно положить на основание, если оно пустое - Ace.
  // 2. Если на основании уже есть карты, то на верх можно положить
  // только карту со значением ранга + 1 от последней карты основания.
  // Также, карта должна быть той же масти.
  if (isEmptyAndAvailable || isNotEmptyAndAvailable) {
    ev.preventDefault()
  }
}

const handleDrop = () => {
  const card = dragStore.card

  if (!card) return

  const isBasisEmpty = props.basis.isEmpty
  const lastCard = props.basis.tryToGetLastCard()

  const isEmptyAndAvailable = isBasisEmpty && card.rank === Rank.ACE
  const isNotEmptyAndAvailable =
    !isBasisEmpty && lastCard && isDropAvailable(lastCard, card)

  // 1. Минимальная карта, которую можно положить на основание, если оно пустое - Ace.
  // 2. Если на основании уже есть карты, то на верх можно положить
  // только карту со значением ранга + 1 от последней карты основания.
  // Также, карта должна быть той же масти.
  if (isEmptyAndAvailable || isNotEmptyAndAvailable) {
    gameStore.addCardToBasis(basisId, card.id)
  }
}

const isDropAvailable = (lastCard: CardImpl, draggableCard: CardImpl) => {
  return (
    lastCard.rank + 1 === draggableCard.rank &&
    props.basis.suit === draggableCard.suit
  )
}
</script>

<template>
  <div
    :class="$style.root"
    @dragenter="dragStore.setBasisId(basisId), dragStore.resetColumnId()"
    @dragleave="dragStore.resetBasisId"
    @dragover="handleDragOver"
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
