<script setup lang="ts">
import { computed, ref } from 'vue'

import GameCard from './GameCard.vue'
import BasicCard from '@ui/BasicCard.vue'
import { useGameStore } from '@stores/game'
import { useDragStore } from '@stores/drag'
import { useInterfaceStore } from '@stores/interface'
import { computeGameCardStyles } from './computeGameCardStyles'
import { getCardImagePath } from '@helpers/getCardImagePath'
import { IMAGES_ASSETS_PATH, pathForAssets } from '@site/config'
import type { Card } from '@entities/Card'

const props = defineProps<{
  card: Card
}>()

const gameStore = useGameStore()
const dragStore = useDragStore()
const interfaceStore = useInterfaceStore()

const rootNodeRef = ref<HTMLDivElement | null>(null)
const style = computed(() => computeGameCardStyles(props.card))
const isDragging = computed(() => dragStore.isCardDragging(props.card.id))
const nextCard = computed(() => {
  const card = props.card

  if (!card.column) {
    return null
  }

  return gameStore.solitaire.getNextCardInColumn(card.column, card.id)
})

const handleStartAction = (x: number, y: number) => {
  if (!props.card.isFlipped || dragStore.card) return
  const rootNode = rootNodeRef.value
  if (!rootNode) return
  const nodeRect = rootNode.getBoundingClientRect()

  dragStore.setInitialCardCoords(nodeRect.left, nodeRect.top)
  dragStore.setInitialCursorCoords(x, y)
  dragStore.setMoveOffset(x, y)
  dragStore.setCard(props.card)
}

const handleMouseDown = (ev: MouseEvent) =>
  handleStartAction(ev.clientX, ev.clientY)

const handleTouchStart = (ev: TouchEvent) => {
  const touches = ev.touches
  const firstTouch = touches.item(0)

  if (!firstTouch) return

  handleStartAction(firstTouch.clientX, firstTouch.clientY)
}

const handleBaseDrop = (baseId: number) => {
  if (!dragStore.card) return

  if (!gameStore.isDropToBaseAvailable(baseId, dragStore.card)) return

  gameStore.addCardToBase(baseId, dragStore.card)
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
  ) as HTMLElement[]

  const isHasDroppableElementBelow = Boolean(
    elementsBelow.find(element => element.dataset.droppable)
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

const getImagePath = () => {
  const card = props.card

  if (!card.isFlipped) {
    return pathForAssets(`${IMAGES_ASSETS_PATH}/card_back.png`)
  }

  return getCardImagePath({
    suit: card.suit,
    rank: card.rank,
    styleVariant: interfaceStore.gameCardStyle
  })
}
</script>

<template>
  <div
    ref="rootNodeRef"
    :class="[
      $style.root,
      card.inColumn && $style.columnCard,
      isDragging && $style.dragging
    ]"
    :style="style.value"
    @mousedown.prevent="handleMouseDown"
    @mouseup="handleMouseUpOrTouchEnd"
    @touchstart.passive="handleTouchStart"
    @touchend="handleMouseUpOrTouchEnd"
    @touchcancel="dragStore.$reset"
  >
    <BasicCard
      :rank="card.rank"
      :suit="card.suit"
      :image-path="getImagePath()"
    />
    <GameCard v-if="nextCard" :card="nextCard" />
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

.dragging {
  @include with-box-shadow;

  position: fixed;
  cursor: grabbing;
  transform: translate3d(0, 0, 0) !important;
}

.columnCard {
  @include with-box-shadow;
}
</style>
