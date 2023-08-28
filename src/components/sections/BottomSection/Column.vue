<!--TODO: CardCover v-if="props.column.cards.length <= 1"-->

<script setup lang="ts">
import { computed } from 'vue'

import Card from '@ui/Card.vue'
import CardCover from '@ui/CardCover.vue'
import { useDragStore } from '@stores/useDragStore.ts'
import { useGameStore } from '@stores/useGameStore.ts'
import type { Column } from '@entities/Column.ts'
import type { Card as CardImpl } from '@entities/Card.ts'
import { Rank } from '@app-types/card'

const gameStore = useGameStore()
const dragStore = useDragStore()

const props = defineProps<{ column: Column }>()
const columnId = props.column.id

const cardsIds = computed(() => {
  return props.column.cards.map(card => card.id)
})
const flippedCards = computed(() => {
  return props.column.cards.filter(card => card.isFlipped)
})
const unflippedCards = computed(() => {
  return props.column.cards.filter(card => !card.isFlipped)
})

// Column DnD
const handleColumnDragOver = (ev: DragEvent) => {
  const dragCard = dragStore.card
  const dragCards = dragStore.cards

  if (!dragCard && dragCards.length === 0) return

  const isColumnEmpty = props.column.isEmpty
  const lastColumnCard = props.column.tryToGetLastCard()

  const firstDragCard = dragCards[0]

  // Если столбец пустой, то положить в него можно только короля.
  if (isColumnEmpty) {
    if (dragCard && dragCard.rank === Rank.KING) {
      ev.preventDefault()
      return
    }

    // Если переносится несколько карт, то первой из них должен быть король.
    if (dragCards.length > 0 && firstDragCard.rank === Rank.KING) {
      ev.preventDefault()
    }

    return
  }

  // Если переносится только одна карта.
  if (dragCard) {
    if (!lastColumnCard || !isDropAvailable(lastColumnCard, dragCard)) {
      return
    }

    ev.preventDefault()

    return
  }

  // Если переносится больше одной карты.
  if (dragCards.length > 0) {
    if (!lastColumnCard || !isDropAvailable(lastColumnCard, firstDragCard)) {
      return
    }

    ev.preventDefault()
  }
}

const handleColumnDrop = () => {
  const dragCard = dragStore.card
  const dragCards = dragStore.cards

  if (!dragCard && dragCards.length === 0) return

  const isColumnEmpty = props.column.isEmpty
  const lastColumnCard = props.column.tryToGetLastCard()

  const dragCardsIds = dragCards.map(card => card.id)
  const firstDragCard = dragCards[0]

  // Если столбец пустой, то положить в него можно только короля.
  if (isColumnEmpty) {
    if (dragCard && dragCard.rank === Rank.KING) {
      gameStore.addOneCardToColumn(columnId, dragCard.id)
      dragStore.$reset()
      return
    }

    // Если переносится несколько карт, то первой из них должен быть король.
    if (dragCards.length > 0 && firstDragCard.rank === Rank.KING) {
      gameStore.addManyCardsToColumn(columnId, dragCardsIds)
      dragStore.$reset()
    }

    return
  }

  // Если переносится только одна карта.
  if (dragCard) {
    if (!lastColumnCard || !isDropAvailable(lastColumnCard, dragCard)) {
      return
    }

    gameStore.addOneCardToColumn(columnId, dragCard.id)
    dragStore.$reset()

    return
  }

  // Если переносится больше одной карты.
  if (dragCards.length > 0) {
    if (!lastColumnCard || !isDropAvailable(lastColumnCard, firstDragCard)) {
      return
    }

    gameStore.addManyCardsToColumn(columnId, dragCardsIds)
    dragStore.$reset()
  }
}

// Card DnD
const handleCardDragStart = (card: CardImpl, index: number) => {
  const isLastFlippedCard = flippedCards.value.length - 1 === index // TODO: Нейминг

  if (!isLastFlippedCard) {
    const downFlipped = flippedCards.value.slice(index)
    dragStore.setCards(downFlipped)
    return
  }

  dragStore.setCard(card)
}

const isDropAvailable = (lastCard: CardImpl, droppableCard: CardImpl) => {
  return (
    lastCard.color !== droppableCard.color &&
    lastCard.rank - 1 === droppableCard.rank
  )
}

const getTopCardOffset = (cardId: string) => {
  return cardsIds.value.indexOf(cardId) * 30 + '%'
}
</script>

<template>
  <div
    :class="$style.root"
    @dragenter="dragStore.setColumnId(columnId), dragStore.resetBasisId()"
    @dragleave="dragStore.resetColumnId()"
    @dragover="handleColumnDragOver"
    @drop.prevent="handleColumnDrop"
  >
    <CardCover />
    <Card
      v-for="card of unflippedCards"
      :key="card.id"
      :card="card"
      :class="$style.card"
      :style="{ top: getTopCardOffset(card.id) }"
    />
    <Card
      v-for="(card, index) of flippedCards"
      :key="card.id"
      :card="card"
      :draggable="true"
      :class="$style.card"
      :style="{ top: getTopCardOffset(card.id) }"
      @dragstart="handleCardDragStart(card, index)"
      @dragend="dragStore.resetCard(), dragStore.resetCards()"
    />
  </div>
</template>

<style module lang="scss">
.root {
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.card {
  position: absolute;
  left: 0;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;
}
</style>
