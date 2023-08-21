import { Color, Rank, Suit } from '@app-types/card'

import heartsAce from './images/cards/hearts/hearts_ace.png'
import diamondsAce from './images/cards/diamonds/diamonds_ace.png'
import clubsAce from './images/cards/clubs/clubs_ace.png'
import spadesAce from './images/cards/spades/spades_ace.png'

import heartsJack from './images/cards/hearts/hearts_jack.png'
import diamondsJack from './images/cards/diamonds/diamonds_jack.png'
import clubsJack from './images/cards/clubs/clubs_jack.png'
import spadesJack from './images/cards/spades/spades_jack.png'

import heartsQueen from './images/cards/hearts/hearts_queen.png'
import diamondsQueen from './images/cards/diamonds/diamonds_queen.png'
import clubsQueen from './images/cards/clubs/clubs_queen.png'
import spadesQueen from './images/cards/spades/spades_queen.png'

import heartsKing from './images/cards/hearts/hearts_king.png'
import diamondsKing from './images/cards/diamonds/diamonds_king.png'
import clubsKing from './images/cards/clubs/clubs_king.png'
import spadesKing from './images/cards/spades/spades_king.png'

import heartsTen from './images/cards/hearts/hearts_ten.png'
import diamondsTen from './images/cards/diamonds/diamonds_ten.png'
import clubsTen from './images/cards/clubs/clubs_ten.png'
import spadesTen from './images/cards/spades/spades_ten.png'

import heartsNine from './images/cards/hearts/hearts_nine.png'
import diamondsNine from './images/cards/diamonds/diamonds_nine.png'
import clubsNine from './images/cards/clubs/clubs_nine.png'
import spadesNine from './images/cards/spades/spades_nine.png'

import heartsEight from './images/cards/hearts/hearts_eight.png'
import diamondsEight from './images/cards/diamonds/diamonds_eight.png'
import clubsEight from './images/cards/clubs/clubs_eight.png'
import spadesEight from './images/cards/spades/spades_eight.png'

import heartsSeven from './images/cards/hearts/hearts_seven.png'
import diamondsSeven from './images/cards/diamonds/diamonds_seven.png'
import clubsSeven from './images/cards/clubs/clubs_seven.png'
import spadesSeven from './images/cards/spades/spades_seven.png'

import heartsSix from './images/cards/hearts/hearts_six.png'
import diamondsSix from './images/cards/diamonds/diamonds_six.png'
import clubsSix from './images/cards/clubs/clubs_six.png'
import spadesSix from './images/cards/spades/spades_six.png'

import heartsFive from './images/cards/hearts/hearts_five.png'
import diamondsFive from './images/cards/diamonds/diamonds_five.png'
import clubsFive from './images/cards/clubs/clubs_five.png'
import spadesFive from './images/cards/spades/spades_five.png'

import heartsFour from './images/cards/hearts/hearts_four.png'
import diamondsFour from './images/cards/diamonds/diamonds_four.png'
import clubsFour from './images/cards/clubs/clubs_four.png'
import spadesFour from './images/cards/spades/spades_four.png'

import heartsThree from './images/cards/hearts/hearts_three.png'
import diamondsThree from './images/cards/diamonds/diamonds_three.png'
import clubsThree from './images/cards/clubs/clubs_three.png'
import spadesThree from './images/cards/spades/spades_three.png'

import heartsDeuce from './images/cards/hearts/hearts_deuce.png'
import diamondsDeuce from './images/cards/diamonds/diamonds_deuce.png'
import clubsDeuce from './images/cards/clubs/clubs_deuce.png'
import spadesDeuce from './images/cards/spades/spades_deuce.png'

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
    image: heartsAce
  },
  {
    ...diamondsCard,
    rank: Rank.ACE,
    image: diamondsAce
  },
  {
    ...clubsCard,
    rank: Rank.ACE,
    image: clubsAce
  },
  {
    ...spadesCard,
    rank: Rank.ACE,
    image: spadesAce
  }
]
const kings = [
  {
    ...heartsCard,
    rank: Rank.KING,
    image: heartsKing
  },
  {
    ...diamondsCard,
    rank: Rank.KING,
    image: diamondsKing
  },
  {
    ...clubsCard,
    rank: Rank.KING,
    image: clubsKing
  },
  {
    ...spadesCard,
    rank: Rank.KING,
    image: spadesKing
  }
]
const queens = [
  {
    ...heartsCard,
    rank: Rank.QUEEN,
    image: heartsQueen
  },
  {
    ...diamondsCard,
    rank: Rank.QUEEN,
    image: diamondsQueen
  },
  {
    ...clubsCard,
    rank: Rank.QUEEN,
    image: clubsQueen
  },
  {
    ...spadesCard,
    rank: Rank.QUEEN,
    image: spadesQueen
  }
]
const jacks = [
  {
    ...heartsCard,
    rank: Rank.JACK,
    image: heartsJack
  },
  {
    ...diamondsCard,
    rank: Rank.JACK,
    image: diamondsJack
  },
  {
    ...clubsCard,
    rank: Rank.JACK,
    image: clubsJack
  },
  {
    ...spadesCard,
    rank: Rank.JACK,
    image: spadesJack
  }
]
const tens = [
  {
    ...heartsCard,
    rank: Rank.TEN,
    image: heartsTen
  },
  {
    ...diamondsCard,
    rank: Rank.TEN,
    image: diamondsTen
  },
  {
    ...clubsCard,
    rank: Rank.TEN,
    image: clubsTen
  },
  {
    ...spadesCard,
    rank: Rank.TEN,
    image: spadesTen
  }
]
const nines = [
  {
    ...heartsCard,
    rank: Rank.NINE,
    image: heartsNine
  },
  {
    ...diamondsCard,
    rank: Rank.NINE,
    image: diamondsNine
  },
  {
    ...clubsCard,
    rank: Rank.NINE,
    image: clubsNine
  },
  {
    ...spadesCard,
    rank: Rank.NINE,
    image: spadesNine
  }
]
const eights = [
  {
    ...heartsCard,
    rank: Rank.EIGHT,
    image: heartsEight
  },
  {
    ...diamondsCard,
    rank: Rank.EIGHT,
    image: diamondsEight
  },
  {
    ...clubsCard,
    rank: Rank.EIGHT,
    image: clubsEight
  },
  {
    ...spadesCard,
    rank: Rank.EIGHT,
    image: spadesEight
  }
]
const sevens = [
  {
    ...heartsCard,
    rank: Rank.SEVEN,
    image: heartsSeven
  },
  {
    ...diamondsCard,
    rank: Rank.SEVEN,
    image: diamondsSeven
  },
  {
    ...clubsCard,
    rank: Rank.SEVEN,
    image: clubsSeven
  },
  {
    ...spadesCard,
    rank: Rank.SEVEN,
    image: spadesSeven
  }
]
const sixes = [
  {
    ...heartsCard,
    rank: Rank.SIX,
    image: heartsSix
  },
  {
    ...diamondsCard,
    rank: Rank.SIX,
    image: diamondsSix
  },
  {
    ...clubsCard,
    rank: Rank.SIX,
    image: clubsSix
  },
  {
    ...spadesCard,
    rank: Rank.SIX,
    image: spadesSix
  }
]
const fives = [
  {
    ...heartsCard,
    rank: Rank.FIVE,
    image: heartsFive
  },
  {
    ...diamondsCard,
    rank: Rank.FIVE,
    image: diamondsFive
  },
  {
    ...clubsCard,
    rank: Rank.FIVE,
    image: clubsFive
  },
  {
    ...spadesCard,
    rank: Rank.FIVE,
    image: spadesFive
  }
]
const fours = [
  {
    ...heartsCard,
    rank: Rank.FOUR,
    image: heartsFour
  },
  {
    ...diamondsCard,
    rank: Rank.FOUR,
    image: diamondsFour
  },
  {
    ...clubsCard,
    rank: Rank.FOUR,
    image: clubsFour
  },
  {
    ...spadesCard,
    rank: Rank.FOUR,
    image: spadesFour
  }
]
const triplets = [
  {
    ...heartsCard,
    rank: Rank.THREE,
    image: heartsThree
  },
  {
    ...diamondsCard,
    rank: Rank.THREE,
    image: diamondsThree
  },
  {
    ...clubsCard,
    rank: Rank.THREE,
    image: clubsThree
  },
  {
    ...spadesCard,
    rank: Rank.THREE,
    image: spadesThree
  }
]
const deuces = [
  {
    ...heartsCard,
    rank: Rank.DEUCE,
    image: heartsDeuce
  },
  {
    ...diamondsCard,
    rank: Rank.DEUCE,
    image: diamondsDeuce
  },
  {
    ...clubsCard,
    rank: Rank.DEUCE,
    image: clubsDeuce
  },
  {
    ...spadesCard,
    rank: Rank.DEUCE,
    image: spadesDeuce
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
