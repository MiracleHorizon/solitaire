import { describe, expect, it } from '@jest/globals'

import { Board } from '@entities/Board.ts'

describe('Board.ts', () => {
  let board = new Board()

  beforeEach(() => {
    board = new Board()
  })

  it('should create columns, bases and deck', () => {
    expect(board.columns.length).toBeGreaterThan(0)
    expect(board.bases.length).toBeGreaterThan(0)
    expect(board.deck.cards.length).toBeGreaterThan(0)
    expect(board.cardsReserve.length).toBeGreaterThan(0)
  })

  it('should add the card to the base from reserve', () => {
    const base = board.bases[0]
    expect(base).toBeDefined()
    const card = board.cardsReserve[0]
    expect(card).toBeDefined()

    const baseId = base.id
    const cardId = card.id

    board.addCardToBase(baseId, cardId)
    expect(card.base).toBe(baseId)
    expect(base.isHasCardWithId(card.id)).toBeTruthy()
    expect(board.cardsReserve).not.toContainEqual(card)
  })

  it('should add one card to column from reserve', () => {
    const column = board.columns[0]
    expect(column).toBeDefined()
    const card = board.cardsReserve[0]
    expect(card).toBeDefined()

    const columnId = column.id
    const cardId = card.id

    board.addOneCardToColumn(columnId, cardId)
    expect(card.column).toBe(columnId)
    expect(column.isHasCardWithId(card.id)).toBeTruthy()
    expect(board.cardsReserve).not.toContainEqual(card)
  })

  it('should move the card from the column to the base', () => {
    const base = board.bases[0]
    expect(base).toBeDefined()
    const column = board.columns[0]
    expect(column).toBeDefined()
    const card = board.cardsReserve[0]
    expect(card).toBeDefined()

    const baseId = base.id
    const columnId = column.id
    const cardId = card.id

    board.addOneCardToColumn(columnId, cardId)
    expect(column.isHasCardWithId(cardId)).toBeTruthy()

    board.addCardToBase(baseId, card.id)
    expect(base.isHasCardWithId(cardId)).toBeTruthy()
    expect(column.isHasCardWithId(cardId)).toBeFalsy()
  })

  it('should move the card from one base to another', () => {
    const baseFrom = board.bases[0]
    expect(baseFrom).toBeDefined()
    const baseTo = board.bases[1]
    expect(baseTo).toBeDefined()
    const card = board.cardsReserve[0]
    expect(card).toBeDefined()

    const baseFromId = baseFrom.id
    const baseToId = baseTo.id
    const cardId = card.id

    expect(card).toBeDefined()
    board.addCardToBase(baseFromId, cardId)

    board.addCardToBase(baseToId, cardId)
    expect(baseFrom.isHasCardWithId(card.id)).toBeFalsy()
    expect(baseTo.isHasCardWithId(card.id)).toBeTruthy()
  })

  it('should move the card from the base to the column', () => {
    const base = board.bases[0]
    expect(base).toBeDefined()
    const column = board.columns[0]
    expect(column).toBeDefined()
    const card = board.cardsReserve[0]
    expect(card).toBeDefined()

    const columnId = column.id
    const baseId = base.id
    const cardId = card.id

    board.addCardToBase(baseId, cardId)
    expect(base.isHasCardWithId(cardId)).toBeTruthy()

    board.addOneCardToColumn(columnId, cardId)
    expect(base.isHasCardWithId(cardId)).toBeFalsy()
    expect(column.isHasCardWithId(cardId)).toBeTruthy()
    expect(card.onBase).toBeFalsy()
    expect(card.inColumn).toBeTruthy()
    expect(card.column).toBe(columnId)
  })

  it('should move the card from one column to another', () => {
    const columnFrom = board.columns[0]
    expect(columnFrom).toBeDefined()
    const columnTo = board.columns[1]
    expect(columnTo).toBeDefined()
    const card = board.cardsReserve[0]
    expect(card).toBeDefined()

    const columnFromId = columnFrom.id
    const columnToId = columnTo.id
    const cardId = card.id

    board.addOneCardToColumn(columnFromId, cardId)
    expect(columnFrom.isHasCardWithId(cardId)).toBeTruthy()
    expect(card.column).toBe(columnFrom.id)

    board.addOneCardToColumn(columnToId, cardId)
    expect(columnFrom.isHasCardWithId(cardId)).toBeFalsy()
    expect(columnTo.isHasCardWithId(cardId)).toBeTruthy()
    expect(card.column).toBe(columnTo.id)
  })

  it('should add many cards from reserve to the column', () => {
    const column = board.columns[0]
    expect(column).toBeDefined()
    const cards = board.cardsReserve.slice(0, 2)
    expect(cards.length).toBe(2)

    const columnId = column.id
    const cardsIds = cards.map(card => card.id)

    board.addManyCardsToColumn(columnId, cardsIds)
    expect(column.isHasCardWithId(cards[0].id)).toBeTruthy()
    expect(column.isHasCardWithId(cards[1].id)).toBeTruthy()
  })
})
