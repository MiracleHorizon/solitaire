import { computed, type StyleValue } from 'vue'

import { useGameStore } from '@stores/game.ts'
import { useDragStore } from '@stores/drag.ts'
import { Card } from '@entities/Card.ts'

export const computeGameCardStyles = (card: Card) => {
  const gameStore = useGameStore()
  const dragStore = useDragStore()

  const isDragging = computed(() => dragStore.isCardDragging(card.id))
  const indexInColumn = computed(() => {
    if (!card.column) {
      return -1
    }

    return gameStore.solitaire.getCardIndexInColumn(card.column, card.id)
  })
  const isFirstInColumn = computed(() => indexInColumn.value === 0)
  const isFirstFlippedInColumn = computed(() => {
    if (!card.column) {
      return false
    }

    return gameStore.solitaire.isFirstFlippedCardInColumn(card.column, card.id)
  })

  const draggingStyle = computed(() => {
    if (!isDragging.value) return

    const offsetX = dragStore.moveOffsetX
    const offsetY = dragStore.moveOffsetY

    if (offsetX === 0 && offsetY === 0) return

    const deltaX = offsetX - dragStore.initialCursorX
    const deltaY = offsetY - dragStore.initialCursorY

    const left = dragStore.initialCardX + deltaX + 'px'
    const top = dragStore.initialCardY + deltaY + 'px'
    const zIndex = gameStore.cards.length + 1

    return { left, top, zIndex } as StyleValue
  })
  const topPosition = computed(() => {
    if (!card.inColumn || isFirstInColumn.value) {
      return 0
    }

    if (isFirstFlippedInColumn.value) {
      return '20%'
    }

    return (card.isFlipped ? 30 : 20) + '%'
  })

  return computed(() => {
    if (isDragging.value) {
      return draggingStyle.value
    }

    return {
      top: topPosition.value,
      position: isFirstInColumn.value ? 'relative' : 'absolute'
    } as StyleValue
  })
}
