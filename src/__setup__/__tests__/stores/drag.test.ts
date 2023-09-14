import { beforeEach, beforeAll, describe, expect, it } from '@jest/globals'
import { createPinia, setActivePinia } from 'pinia'

import { BASE_POSITION_VALUE, useDragStore } from '@stores/drag.ts'
import { generateMockCard } from '__setup__/helpers/generateMockCard.ts'

describe('drag.ts', () => {
  const card = generateMockCard()

  beforeAll(() => {
    Object.freeze(card)
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should set the initial position of the drag card', () => {
    const dragStore = useDragStore()

    expect(dragStore.initialCardX).toBe(BASE_POSITION_VALUE)
    expect(dragStore.initialCardY).toBe(BASE_POSITION_VALUE)

    dragStore.setInitialCardCoords(10, 38)
    expect(dragStore.initialCardX).toBe(10)
    expect(dragStore.initialCardY).toBe(38)

    dragStore.setInitialCardCoords(48, 214)
    expect(dragStore.initialCardX).toBe(48)
    expect(dragStore.initialCardY).toBe(214)

    dragStore.setInitialCardCoords(-390, 958)
    expect(dragStore.initialCardX).toBe(0)
    expect(dragStore.initialCardY).toBe(958)

    dragStore.setInitialCardCoords(-979, -1)
    expect(dragStore.initialCardX).toBe(0)
    expect(dragStore.initialCardY).toBe(0)

    dragStore.setInitialCursorCoords(0, 0)
    expect(dragStore.initialCardX).toBe(0)
    expect(dragStore.initialCardY).toBe(0)

    dragStore.$reset()
    expect(dragStore.initialCardX).toBe(BASE_POSITION_VALUE)
    expect(dragStore.initialCardY).toBe(BASE_POSITION_VALUE)
  })

  it('should set the initial position of the cursor', () => {
    const dragStore = useDragStore()

    expect(dragStore.initialCursorX).toBe(BASE_POSITION_VALUE)
    expect(dragStore.initialCursorY).toBe(BASE_POSITION_VALUE)

    dragStore.setInitialCursorCoords(394, 720)
    expect(dragStore.initialCursorX).toBe(394)
    expect(dragStore.initialCursorY).toBe(720)

    dragStore.setInitialCursorCoords(690, 540)
    expect(dragStore.initialCursorX).toBe(690)
    expect(dragStore.initialCursorY).toBe(540)

    dragStore.setInitialCursorCoords(-40, 59)
    expect(dragStore.initialCursorX).toBe(0)
    expect(dragStore.initialCursorY).toBe(59)

    dragStore.setInitialCursorCoords(-500, -1000)
    expect(dragStore.initialCursorX).toBe(0)
    expect(dragStore.initialCursorY).toBe(0)

    dragStore.setInitialCursorCoords(0, 0)
    expect(dragStore.initialCursorX).toBe(0)
    expect(dragStore.initialCursorY).toBe(0)

    dragStore.$reset()
    expect(dragStore.initialCursorX).toBe(BASE_POSITION_VALUE)
    expect(dragStore.initialCursorY).toBe(BASE_POSITION_VALUE)
  })

  it('should set the move offset', () => {
    const dragStore = useDragStore()

    expect(dragStore.moveOffsetX).toBe(BASE_POSITION_VALUE)
    expect(dragStore.moveOffsetY).toBe(BASE_POSITION_VALUE)

    dragStore.setMoveOffset(3, 24)
    expect(dragStore.moveOffsetX).toBe(3)
    expect(dragStore.moveOffsetY).toBe(24)

    dragStore.setMoveOffset(781, 0)
    expect(dragStore.moveOffsetX).toBe(781)
    expect(dragStore.moveOffsetY).toBe(0)

    dragStore.setMoveOffset(0, 0)
    expect(dragStore.moveOffsetX).toBe(0)
    expect(dragStore.moveOffsetY).toBe(0)

    dragStore.setMoveOffset(-40, -384)
    expect(dragStore.moveOffsetX).toBe(0)
    expect(dragStore.moveOffsetY).toBe(0)

    dragStore.$reset()
    expect(dragStore.moveOffsetX).toBe(BASE_POSITION_VALUE)
    expect(dragStore.moveOffsetY).toBe(BASE_POSITION_VALUE)
  })

  it('should set the drop column id', () => {
    const dragStore = useDragStore()

    expect(dragStore.columnId).toBeNull()

    dragStore.setColumnId(1)
    expect(dragStore.columnId).toBe(1)

    dragStore.resetColumnId()
    expect(dragStore.columnId).toBeNull()

    dragStore.setColumnId(4)
    expect(dragStore.columnId).toBe(4)

    dragStore.setColumnId(-1)
    expect(dragStore.columnId).toBeNull()

    dragStore.setColumnId(2)
    expect(dragStore.columnId).toBe(2)

    dragStore.$reset()
    expect(dragStore.columnId).toBeNull()
  })

  it('should set the drop base id', () => {
    const dragStore = useDragStore()

    expect(dragStore.baseId).toBeNull()

    dragStore.setBaseId(3)
    expect(dragStore.baseId).toBe(3)

    dragStore.resetBaseId()
    expect(dragStore.baseId).toBeNull()

    dragStore.setBaseId(2)
    expect(dragStore.baseId).toBe(2)

    dragStore.setBaseId(-4)
    expect(dragStore.baseId).toBeNull()

    dragStore.setBaseId(6)
    expect(dragStore.baseId).toBe(6)

    dragStore.$reset()
    expect(dragStore.baseId).toBeNull()
  })

  it('should set the drag card', () => {
    const dragStore = useDragStore()

    expect(dragStore.card).toBeNull()

    dragStore.setCard(card)
    expect(dragStore.card).toBeDefined()
    expect(dragStore.card?.id).toBe(card.id)

    dragStore.$reset()
    expect(dragStore.card).toBeNull()
  })

  it('should return is card dragging', () => {
    const dragStore = useDragStore()

    expect(dragStore.card).toBeNull()
    expect(dragStore.isCardDragging('3')).toBeFalsy()

    dragStore.setCard(card)
    expect(dragStore.isCardDragging('1')).toBeFalsy()
    expect(dragStore.isCardDragging(card.id)).toBeTruthy()

    dragStore.$reset()
    expect(dragStore.isCardDragging(card.id)).toBeFalsy()
  })
})
