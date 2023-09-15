<script setup lang="ts">
import { computed, ref, type StyleValue } from 'vue'
import { useCssVar } from '@vueuse/core'

import PlayCard from './PlayCard.vue'
import BaseCard from '@ui/BaseCard.vue'
import { useGameStore } from '@stores/game.ts'
import { useDragStore } from '@stores/drag.ts'
import type { Card } from '@entities/Card.ts'
import cardBackPng from '@images/cards/card_back.png'

const props = defineProps<{ card: Card; top?: string }>()
const boxShadow = useCssVar('--box-shadow')
const rootNodeRef = ref(null)

const gameStore = useGameStore()
const dragStore = useDragStore()

const nextCard = computed(() => {
  if (!props.card.column) {
    return null
  }

  return gameStore.solitaire.getNextCardInColumn(
    props.card.column,
    props.card.id
  )
})

const cardIndexInColumn = computed(() => {
  if (!props.card.column) {
    return -1
  }

  return gameStore.solitaire.getCardIndexInColumn(
    props.card.column,
    props.card.id
  )
})

const draggingStyles = computed(() => {
  if (!dragStore.isCardDragging(props.card.id)) return

  const offsetX = dragStore.moveOffsetX
  const offsetY = dragStore.moveOffsetY

  if (offsetX === 0 && offsetY === 0) return

  const deltaX = offsetX - dragStore.initialCursorX
  const deltaY = offsetY - dragStore.initialCursorY

  const left = dragStore.initialCardX + deltaX + 'px'
  const top = dragStore.initialCardY + deltaY + 'px'

  return {
    position: 'fixed',
    cursor: 'grabbing',
    left,
    top,
    zIndex: gameStore.cards.length + 1,
    transform: 'translateX(0)',
    boxShadow: boxShadow.value
  } as StyleValue
})

const handlePosition = () => {
  if (!props.card.inColumn) {
    return 'absolute'
  }

  if (cardIndexInColumn.value < 0) {
    return 'static'
  }

  return cardIndexInColumn.value === 0 ? 'relative' : 'absolute'
}

const handleTopPosition = () => {
  if (props.top) {
    return props.top
  }

  if (cardIndexInColumn.value < 0) return

  const card = props.card

  if (card.column) {
    if (
      gameStore.solitaire.getCardIndexInColumnFlippedCards(
        card.column,
        card.id
      ) === 0 &&
      cardIndexInColumn.value > 0
    ) {
      return '20%'
    }
  }

  if (cardIndexInColumn.value > 0) {
    return (card.isFlipped ? 30 : 20) + '%'
  }

  return
}

const getStyles = () => {
  const card = props.card
  const isDragging = dragStore.isCardDragging(card.id)

  if (isDragging) {
    return draggingStyles.value
  }

  const styles: StyleValue = {
    top: handleTopPosition(),
    position: handlePosition()
  }

  if (card.inColumn) {
    styles.boxShadow = boxShadow.value
  }

  return styles
}

const handleStartAction = (x: number, y: number) => {
  if (dragStore.card) return // TODO: Посмотреть
  const rootNode = rootNodeRef.value as HTMLDivElement | null
  if (!rootNode) return
  const nodeRect = rootNode.getBoundingClientRect()

  dragStore.setMoveOffset(x, y)
  dragStore.setInitialCursorCoords(x, y)
  dragStore.setInitialCardCoords(nodeRect.left, nodeRect.top)
  dragStore.setCard(props.card)
}

const handleMouseDown = (ev: MouseEvent) => {
  if (!props.card.isFlipped) return
  handleStartAction(ev.clientX, ev.clientY)
}

const handleTouchStart = (ev: TouchEvent) => {
  if (!props.card.isFlipped) return

  const touches = ev.touches
  const firstTouch = touches.item(0)

  if (!firstTouch) return

  handleStartAction(firstTouch.clientX, firstTouch.clientY)
}

const handleBaseDrop = (baseId: number) => {
  if (!dragStore.card) return
  if (!gameStore.isDropToBaseAvailable(baseId, dragStore.card)) return
  gameStore.addCardToBase(baseId, dragStore.card.id)
}

const handleColumnDrop = (columnId: number) => {
  if (!dragStore.card) return
  if (!gameStore.isDropToColumnAvailable(columnId, dragStore.card)) return
  gameStore.addCardsToColumn(columnId, dragStore.card)
}

const handleMouseUpOrTouchEnd = () => {
  const elementsBelow = document.elementsFromPoint(
    dragStore.moveOffsetX,
    dragStore.moveOffsetY
  )

  const isHasDroppableElementBelow = Boolean(
    elementsBelow.find(element => {
      const el = element as HTMLElement
      return el.dataset.droppable
    })
  )

  if (!isHasDroppableElementBelow) {
    return dragStore.$reset()
  }

  if (dragStore.baseId) {
    handleBaseDrop(dragStore.baseId)
  }

  if (dragStore.columnId) {
    handleColumnDrop(dragStore.columnId)
  }

  dragStore.$reset()
}
</script>

<template>
  <div
    ref="rootNodeRef"
    :class="$style.root"
    :style="getStyles()"
    @mousedown.prevent="handleMouseDown"
    @mouseup="handleMouseUpOrTouchEnd"
    @touchstart.passive="handleTouchStart"
    @touchend="handleMouseUpOrTouchEnd"
    @touchcancel="dragStore.$reset"
  >
    <BaseCard
      :image-path="props.card.isFlipped ? props.card.image : cardBackPng"
    />
    <PlayCard v-if="nextCard" :key="nextCard.id" :card="nextCard" />
  </div>
</template>

<style module lang="scss">
@import '@styles/mixins';
@import '@styles/variables';

.root {
  cursor: pointer;
  width: $card-width;
  border-radius: 5px;
  touch-action: none;

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-card-width;
  }
}
</style>
