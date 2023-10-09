import { Color, Rank, Suit } from '@app-types/card'
import { getBasicCardImagePath } from '@shared/helpers/getBasicCardImagePath.ts'

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
    rank: Rank.ACE,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.ACE)
  },
  {
    ...diamondsCard,
    rank: Rank.ACE,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.ACE)
  },
  {
    ...clubsCard,
    rank: Rank.ACE,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.ACE)
  },
  {
    ...spadesCard,
    rank: Rank.ACE,
    image: getBasicCardImagePath(Suit.SPADES, Rank.ACE)
  }
]
const kings = [
  {
    ...heartsCard,
    rank: Rank.KING,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.KING)
  },
  {
    ...diamondsCard,
    rank: Rank.KING,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.KING)
  },
  {
    ...clubsCard,
    rank: Rank.KING,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.KING)
  },
  {
    ...spadesCard,
    rank: Rank.KING,
    image: getBasicCardImagePath(Suit.SPADES, Rank.KING)
  }
]
const queens = [
  {
    ...heartsCard,
    rank: Rank.QUEEN,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.QUEEN)
  },
  {
    ...diamondsCard,
    rank: Rank.QUEEN,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.QUEEN)
  },
  {
    ...clubsCard,
    rank: Rank.QUEEN,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.QUEEN)
  },
  {
    ...spadesCard,
    rank: Rank.QUEEN,
    image: getBasicCardImagePath(Suit.SPADES, Rank.QUEEN)
  }
]
const jacks = [
  {
    ...heartsCard,
    rank: Rank.JACK,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.JACK)
  },
  {
    ...diamondsCard,
    rank: Rank.JACK,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.JACK)
  },
  {
    ...clubsCard,
    rank: Rank.JACK,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.JACK)
  },
  {
    ...spadesCard,
    rank: Rank.JACK,
    image: getBasicCardImagePath(Suit.SPADES, Rank.JACK)
  }
]
const tens = [
  {
    ...heartsCard,
    rank: Rank.TEN,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.TEN)
  },
  {
    ...diamondsCard,
    rank: Rank.TEN,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.TEN)
  },
  {
    ...clubsCard,
    rank: Rank.TEN,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.TEN)
  },
  {
    ...spadesCard,
    rank: Rank.TEN,
    image: getBasicCardImagePath(Suit.SPADES, Rank.TEN)
  }
]
const nines = [
  {
    ...heartsCard,
    rank: Rank.NINE,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.NINE)
  },
  {
    ...diamondsCard,
    rank: Rank.NINE,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.NINE)
  },
  {
    ...clubsCard,
    rank: Rank.NINE,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.NINE)
  },
  {
    ...spadesCard,
    rank: Rank.NINE,
    image: getBasicCardImagePath(Suit.SPADES, Rank.NINE)
  }
]
const eights = [
  {
    ...heartsCard,
    rank: Rank.EIGHT,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.EIGHT)
  },
  {
    ...diamondsCard,
    rank: Rank.EIGHT,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.EIGHT)
  },
  {
    ...clubsCard,
    rank: Rank.EIGHT,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.EIGHT)
  },
  {
    ...spadesCard,
    rank: Rank.EIGHT,
    image: getBasicCardImagePath(Suit.SPADES, Rank.EIGHT)
  }
]
const sevens = [
  {
    ...heartsCard,
    rank: Rank.SEVEN,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.SEVEN)
  },
  {
    ...diamondsCard,
    rank: Rank.SEVEN,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.SEVEN)
  },
  {
    ...clubsCard,
    rank: Rank.SEVEN,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.SEVEN)
  },
  {
    ...spadesCard,
    rank: Rank.SEVEN,
    image: getBasicCardImagePath(Suit.SPADES, Rank.SEVEN)
  }
]
const sixes = [
  {
    ...heartsCard,
    rank: Rank.SIX,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.SIX)
  },
  {
    ...diamondsCard,
    rank: Rank.SIX,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.SIX)
  },
  {
    ...clubsCard,
    rank: Rank.SIX,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.SIX)
  },
  {
    ...spadesCard,
    rank: Rank.SIX,
    image: getBasicCardImagePath(Suit.SPADES, Rank.SIX)
  }
]
const fives = [
  {
    ...heartsCard,
    rank: Rank.FIVE,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.FIVE)
  },
  {
    ...diamondsCard,
    rank: Rank.FIVE,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.FIVE)
  },
  {
    ...clubsCard,
    rank: Rank.FIVE,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.FIVE)
  },
  {
    ...spadesCard,
    rank: Rank.FIVE,
    image: getBasicCardImagePath(Suit.SPADES, Rank.FIVE)
  }
]
const fours = [
  {
    ...heartsCard,
    rank: Rank.FOUR,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.FOUR)
  },
  {
    ...diamondsCard,
    rank: Rank.FOUR,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.FOUR)
  },
  {
    ...clubsCard,
    rank: Rank.FOUR,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.FOUR)
  },
  {
    ...spadesCard,
    rank: Rank.FOUR,
    image: getBasicCardImagePath(Suit.SPADES, Rank.FOUR)
  }
]
const triplets = [
  {
    ...heartsCard,
    rank: Rank.THREE,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.THREE)
  },
  {
    ...diamondsCard,
    rank: Rank.THREE,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.THREE)
  },
  {
    ...clubsCard,
    rank: Rank.THREE,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.THREE)
  },
  {
    ...spadesCard,
    rank: Rank.THREE,
    image: getBasicCardImagePath(Suit.SPADES, Rank.THREE)
  }
]
const deuces = [
  {
    ...heartsCard,
    rank: Rank.DEUCE,
    image: getBasicCardImagePath(Suit.HEARTS, Rank.DEUCE)
  },
  {
    ...diamondsCard,
    rank: Rank.DEUCE,
    image: getBasicCardImagePath(Suit.DIAMONDS, Rank.DEUCE)
  },
  {
    ...clubsCard,
    rank: Rank.DEUCE,
    image: getBasicCardImagePath(Suit.CLUBS, Rank.DEUCE)
  },
  {
    ...spadesCard,
    rank: Rank.DEUCE,
    image: getBasicCardImagePath(Suit.SPADES, Rank.DEUCE)
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
