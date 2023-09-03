<script setup lang="ts">
import TopSection from './sections/TopSection/TopSection.vue'
import BottomSection from './sections/BottomSection/BottomSection.vue'
import { useDragStore } from '@stores/drag.ts'

const dragStore = useDragStore()

const handleMouseMove = (ev: MouseEvent) => {
  if (!dragStore.card) return
  handler(ev.clientX, ev.clientY)
}

const handleTouchMove = (ev: TouchEvent) => {
  if (!dragStore.card) return

  const touches = ev.touches
  const firstTouch = touches.item(0)

  if (!firstTouch) return

  handler(firstTouch.clientX, firstTouch.clientY)
}

const handler = (x: number, y: number) => {
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

  dragStore.setOffset(x, y)
}
</script>

<template>
  <main
    :class="$style.root"
    @mousemove="handleMouseMove"
    @touchmove.passive="handleTouchMove"
    @touchend="dragStore.resetCard(), dragStore.resetOffset()"
    @touchcancel="dragStore.resetOffset()"
  >
    <TopSection />
    <BottomSection />
  </main>
</template>

<style module lang="scss">
@import '@styles/breakpoints';

.root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-top: 24px;
  padding-left: 18px;
  padding-right: 18px;

  @media screen and (max-width: $tablet) {
    padding-left: 14px;
    padding-right: 14px;
  }

  @media screen and (max-width: $mobileLg) {
    padding-left: 10px;
    padding-right: 10px;
  }

  section {
    width: 90vw;
    max-width: 1200px;
  }
}
</style>
