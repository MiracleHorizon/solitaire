import { beforeEach, describe, expect, it } from '@jest/globals'

import { Solitaire } from '@entities/Solitaire.ts'
import { getCardsFromReserve } from '__setup__/helpers/getCardsFromReserve.ts'

describe('Solitaire.ts (bases)', () => {
  const solitaire = new Solitaire()

  beforeEach(() => {
    solitaire.moveAllCardsToReserve()
  })

  it('should move one card from the reserve to the empty base', () => {
    const { spadesAce: card } = getCardsFromReserve(solitaire)
    const base = solitaire.bases[0]

    solitaire.addCardToBase(base.id, card.id)
    expect(base.cards).toContainEqual(card)
    expect(card.base).toBe(base.id)
  })

  it('should move one card to one base from another', () => {
    const { spadesAce: card } = getCardsFromReserve(solitaire)
    const baseTo = solitaire.bases[0]
    const baseFrom = solitaire.bases[1]

    solitaire.board.addCardToBase(baseFrom.id, card.id)
    expect(baseFrom.cards).toContainEqual(card)
    expect(card.base).toBe(baseFrom.id)

    solitaire.addCardToBase(baseTo.id, card.id)
    expect(baseTo.cards).toContainEqual(card)
    expect(card.base).toBe(baseTo.id)
    expect(baseFrom.cards).not.toContainEqual(card)
  })

  it('should move the card from the column to the base', () => {
    const { spadesAce: card } = getCardsFromReserve(solitaire)
    const base = solitaire.bases[0]
    const column = solitaire.columns[0]

    column.addCard(card)
    expect(column.cards).toContainEqual(card)
    expect(card.column).toBe(column.id)
    expect(card.base).toBeNull()

    solitaire.addCardToBase(base.id, card.id)
    expect(base.cards).toContainEqual(card)
    expect(card.base).toBe(base.id)
    expect(column.cards).not.toContainEqual(card)
    expect(card.column).toBeNull()
  })

  it('should return if drop card from reserve to the base available', () => {
    const { spadesAce, spadesDeuce, diamondsAce, diamondsKing } =
      getCardsFromReserve(solitaire)
    const base = solitaire.bases[0]

    expect(solitaire.isDropToBaseAvailable(base.id, spadesAce)).toBeTruthy()
    expect(solitaire.isDropToBaseAvailable(base.id, spadesDeuce)).toBeFalsy()
    expect(solitaire.isDropToBaseAvailable(base.id, diamondsAce)).toBeTruthy()
    expect(solitaire.isDropToBaseAvailable(base.id, diamondsKing)).toBeFalsy()
  })

  it('should return if drop card from one base to another available', () => {
    const { spadesAce, spadesDeuce, diamondsAce, diamondsKing } =
      getCardsFromReserve(solitaire)
    const base = solitaire.bases[0]

    solitaire.addCardToBase(base.id, spadesAce.id)
    expect(base.cards).toContainEqual(spadesAce)
    expect(base.getUpperCardOrNull()).toStrictEqual(spadesAce)
    expect(solitaire.isDropToBaseAvailable(base.id, spadesDeuce)).toBeTruthy()
    expect(solitaire.isDropToBaseAvailable(base.id, diamondsAce)).toBeFalsy()
    expect(solitaire.isDropToBaseAvailable(base.id, diamondsKing)).toBeFalsy()

    solitaire.moveAllCardsToReserve()

    solitaire.addCardToBase(base.id, diamondsAce.id)
    expect(base.cards).toContainEqual(diamondsAce)
    expect(base.getUpperCardOrNull()).toStrictEqual(diamondsAce)
    expect(solitaire.isDropToBaseAvailable(base.id, spadesAce)).toBeFalsy()
    expect(solitaire.isDropToBaseAvailable(base.id, spadesDeuce)).toBeFalsy()
    expect(solitaire.isDropToBaseAvailable(base.id, diamondsKing)).toBeFalsy()
  })
})
