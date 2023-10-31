import { Color, Rank, Suit } from '@app-types/card'

const heartsCard = {
  suit: Suit.HEARTS,
  color: Color.RED
}
const diamondsCard = {
  suit: Suit.DIAMONDS,
  color: Color.RED
}
const clubsCard = {
  suit: Suit.CLUBS,
  color: Color.BLACK
}
const spadesCard = {
  suit: Suit.SPADES,
  color: Color.BLACK
}

const aces = [
  {
    ...heartsCard,
    rank: Rank.ACE
  },
  {
    ...diamondsCard,
    rank: Rank.ACE
  },
  {
    ...clubsCard,
    rank: Rank.ACE
  },
  {
    ...spadesCard,
    rank: Rank.ACE
  }
]
const kings = [
  {
    ...heartsCard,
    rank: Rank.KING
  },
  {
    ...diamondsCard,
    rank: Rank.KING
  },
  {
    ...clubsCard,
    rank: Rank.KING
  },
  {
    ...spadesCard,
    rank: Rank.KING
  }
]
const queens = [
  {
    ...heartsCard,
    rank: Rank.QUEEN
  },
  {
    ...diamondsCard,
    rank: Rank.QUEEN
  },
  {
    ...clubsCard,
    rank: Rank.QUEEN
  },
  {
    ...spadesCard,
    rank: Rank.QUEEN
  }
]
const jacks = [
  {
    ...heartsCard,
    rank: Rank.JACK
  },
  {
    ...diamondsCard,
    rank: Rank.JACK
  },
  {
    ...clubsCard,
    rank: Rank.JACK
  },
  {
    ...spadesCard,
    rank: Rank.JACK
  }
]
const tens = [
  {
    ...heartsCard,
    rank: Rank.TEN
  },
  {
    ...diamondsCard,
    rank: Rank.TEN
  },
  {
    ...clubsCard,
    rank: Rank.TEN
  },
  {
    ...spadesCard,
    rank: Rank.TEN
  }
]
const nines = [
  {
    ...heartsCard,
    rank: Rank.NINE
  },
  {
    ...diamondsCard,
    rank: Rank.NINE
  },
  {
    ...clubsCard,
    rank: Rank.NINE
  },
  {
    ...spadesCard,
    rank: Rank.NINE
  }
]
const eights = [
  {
    ...heartsCard,
    rank: Rank.EIGHT
  },
  {
    ...diamondsCard,
    rank: Rank.EIGHT
  },
  {
    ...clubsCard,
    rank: Rank.EIGHT
  },
  {
    ...spadesCard,
    rank: Rank.EIGHT
  }
]
const sevens = [
  {
    ...heartsCard,
    rank: Rank.SEVEN
  },
  {
    ...diamondsCard,
    rank: Rank.SEVEN
  },
  {
    ...clubsCard,
    rank: Rank.SEVEN
  },
  {
    ...spadesCard,
    rank: Rank.SEVEN
  }
]
const sixes = [
  {
    ...heartsCard,
    rank: Rank.SIX
  },
  {
    ...diamondsCard,
    rank: Rank.SIX
  },
  {
    ...clubsCard,
    rank: Rank.SIX
  },
  {
    ...spadesCard,
    rank: Rank.SIX
  }
]
const fives = [
  {
    ...heartsCard,
    rank: Rank.FIVE
  },
  {
    ...diamondsCard,
    rank: Rank.FIVE
  },
  {
    ...clubsCard,
    rank: Rank.FIVE
  },
  {
    ...spadesCard,
    rank: Rank.FIVE
  }
]
const fours = [
  {
    ...heartsCard,
    rank: Rank.FOUR
  },
  {
    ...diamondsCard,
    rank: Rank.FOUR
  },
  {
    ...clubsCard,
    rank: Rank.FOUR
  },
  {
    ...spadesCard,
    rank: Rank.FOUR
  }
]
const triplets = [
  {
    ...heartsCard,
    rank: Rank.THREE
  },
  {
    ...diamondsCard,
    rank: Rank.THREE
  },
  {
    ...clubsCard,
    rank: Rank.THREE
  },
  {
    ...spadesCard,
    rank: Rank.THREE
  }
]
const deuces = [
  {
    ...heartsCard,
    rank: Rank.DEUCE
  },
  {
    ...diamondsCard,
    rank: Rank.DEUCE
  },
  {
    ...clubsCard,
    rank: Rank.DEUCE
  },
  {
    ...spadesCard,
    rank: Rank.DEUCE
  }
]

export const cardsStatic = [
  kings,
  queens,
  jacks,
  aces,
  tens,
  nines,
  eights,
  sevens,
  sixes,
  fives,
  fours,
  triplets,
  deuces
]
