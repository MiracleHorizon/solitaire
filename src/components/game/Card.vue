<script setup lang="ts">
import { computed, ref, StyleValue } from 'vue'

import Card from './Card.vue'
import { useGameStore } from '@stores/game.ts'
import { useDragStore } from '@stores/drag.ts'
import { StringTransformer } from '@utils/StringTransformer'
import type { Card as CardImpl } from '@entities/Card.ts'
import cardBack from '@images/cards/card_back.png'

const props = defineProps<{ card: CardImpl; top?: string }>()

const rootNodeRef = ref(null)

const gameStore = useGameStore()
const dragStore = useDragStore()

const nextCard = computed(() => {
  if (!props.card.column) {
    return null
  }

  return gameStore.getNextCardInColumn(props.card.column, props.card.id)
})

const cardIndex = computed(() => {
  if (!props.card.column) {
    return null
  }

  return gameStore.getCardIndexInColumn(props.card.column, props.card.id)
})

const style = computed(() => {
  const nodeRef = rootNodeRef.value as HTMLDivElement | null

  if (!nodeRef || !dragStore.card || dragStore.card.id !== props.card.id) {
    return
  }

  const offsetX = dragStore.offsetX
  const offsetY = dragStore.offsetY

  if (offsetX === 0 && offsetY === 0) {
    return
  }

  const rect = nodeRef.getBoundingClientRect()

  return {
    position: 'fixed',
    left: offsetX - rect.width / 2 + 'px',
    top: offsetY - rect.height / 2 + 'px',
    cursor: 'grabbing',
    zIndex: gameStore.board.deck.cards.length + 1,
    transform: 'translateX(0px)'
  } as StyleValue
})

const handleMouseDown = (ev: MouseEvent) => {
  ev.stopPropagation()

  if (!props.card.isFlipped) return

  handler(ev.clientX, ev.clientY)
}

const handleTouchStart = (ev: TouchEvent) => {
  ev.stopPropagation()

  const touches = ev.touches
  const firstTouch = touches.item(0)

  if (!props.card.isFlipped || !firstTouch) return

  handler(firstTouch.clientX, firstTouch.clientY)
}

const handler = (x: number, y: number) => {
  if (dragStore.card) return // TODO: Посмотреть
  dragStore.setOffset(x, y)
  dragStore.setCard(props.card)
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

const handleMouseUp = () => {
  const elementsBelow = document.elementsFromPoint(
    dragStore.offsetX,
    dragStore.offsetY
  )

  const isHasDroppableElementBelow = Boolean(
    elementsBelow.find(element => {
      const el = element as HTMLElement
      return el.dataset.droppable
    })
  )

  if (!isHasDroppableElementBelow) {
    dragStore.$reset()
    return
  }

  if (dragStore.baseId) {
    handleBaseDrop(dragStore.baseId)
  }

  if (dragStore.columnId) {
    handleColumnDrop(dragStore.columnId)
  }

  dragStore.$reset()
}

const handleTopOffset = () => {
  if (props.top) {
    return props.top
  }

  const index = cardIndex.value

  if (index === null) {
    return
  }

  if (props.card.column) {
    const indexInFlipped = gameStore.getCardIndexInColumnFlipped(
      props.card.column,
      props.card.id
    )

    if (indexInFlipped === 0 && index > 0) {
      return '20%'
    }
  }

  if (index > 0) {
    return (props.card.isFlipped ? 30 : 20) + '%'
  }
}

const handlePosition = () => {
  if (!props.card.inColumn) {
    return 'absolute'
  }

  return cardIndex.value !== null
    ? cardIndex.value > 0
      ? 'absolute'
      : 'relative'
    : 'static'
}
</script>

<template>
  <div
    ref="rootNodeRef"
    :class="$style.root"
    :style="
      dragStore.card?.id === card.id
        ? style
        : {
            top: handleTopOffset(),
            position: handlePosition()
          }
    "
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @touchstart.passive="handleTouchStart"
    @touchend="handleMouseUp"
  >
    <img
      :src="card.isFlipped ? card.image : cardBack"
      :alt="
        card.isFlipped
          ? [StringTransformer.capitalizeWord(card.suit), card.rank].join(' ')
          : 'Playing card'
      "
    />
    <Card v-if="nextCard" :card="nextCard" />
  </div>
</template>

<style module lang="scss">
@import '@styles/mixins';
@import '@styles/variables';

.root {
  cursor: pointer;
  width: $card-width;
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0 1px 2px 0,
    rgba(60, 64, 67, 0.15) 0 1px 3px 1px;

  img {
    @include no-select;
    pointer-events: none;
  }
}
</style>
