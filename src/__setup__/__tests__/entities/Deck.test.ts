import { describe, expect, it } from '@jest/globals'

import { Deck } from '@entities/Deck.ts'

describe('Deck.ts', () => {
  const deck = new Deck()

  it('should create an array of cards', () => {
    expect(deck.cards.length).toBeGreaterThan(0)
  })
})
