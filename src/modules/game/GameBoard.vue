<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

import TopSection from './sections/TopSection'
import BottomSection from './sections/BottomSection'
import { useDragStore } from '@stores/drag.ts'

const dragStore = useDragStore()

const handleMove = (x: number, y: number) => {
  const elementsBelow = document.elementsFromPoint(x, y)

  for (const element of elementsBelow as HTMLElement[]) {
    const droppable = element.dataset.droppable
    if (!droppable) continue

    const baseId = element.dataset.baseId
    const columnId = element.dataset.columnId
    if (!baseId && !columnId) continue

    if (baseId && dragStore.baseId !== Number(baseId)) {
      dragStore.setBaseId(Number(baseId))
      dragStore.resetColumnId()
      break
    }

    if (columnId && dragStore.columnId !== Number(columnId)) {
      dragStore.setColumnId(Number(columnId))
      dragStore.resetBaseId()
      break
    }
  }

  dragStore.setMoveOffset(x, y)
}

const handleMouseMove = (ev: MouseEvent) => {
  if (!dragStore.card) return
  handleMove(ev.clientX, ev.clientY)
}

const handleTouchMove = (ev: TouchEvent) => {
  if (!dragStore.card) return

  const touches = ev.touches
  const firstTouch = touches.item(0)

  if (!firstTouch) return

  handleMove(firstTouch.clientX, firstTouch.clientY)
}

useEventListener('mouseup', () => {
  if (dragStore.card) {
    dragStore.$reset()
  }
})
</script>

<template>
  <main
    :class="$style.root"
    @mousemove="handleMouseMove"
    @touchmove.passive="handleTouchMove"
  >
    <TopSection />
    <BottomSection />
  </main>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  section {
    width: $large-screen-content-width;
    margin-top: 20px;

    @media screen and (max-width: $small-content-max-width-bp) {
      width: $small-screen-content-width;
      margin-top: 10px;
    }
  }
}
</style>
