<script setup lang="ts">
import { computed } from 'vue'

import Card from '@components/game/Card.vue'
import CardCover from '@ui/CardCover.vue'
import { useGameStore } from '@stores/game.ts'
import { Card as CardImpl } from '@entities/Card.ts'

const gameStore = useGameStore()
const reserve = computed(() => gameStore.cardsReserve)

const handleClickCard = (card: CardImpl) => {
  if (card.isFlipped) return

  card.flip()
  gameStore.makeMove()
}

const handleFlipAll = () => {
  reserve.value.forEach(card => card.flip())
  gameStore.makeManyMoves(reserve.value.length)
}
</script>

<template>
  <div :class="$style.root">
    <CardCover :class="$style.cardCover" @click="handleFlipAll" />
    <CardCover :class="[$style.cardCover, $style.flippedCard]" />
    <Card
      v-for="(card, index) of reserve"
      :card="card"
      :style="{ zIndex: card.isFlipped ? reserve.length + 1 - index : 1 }"
      :class="[card.isFlipped && $style.flippedCard]"
      @click="handleClickCard(card)"
    />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

$height: $card-height;
$small-height: $small-card-height;

.root {
  position: relative;
  height: $height;
  width: calc($card-width * 2 + $card-x-gap);

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-height;
  }
}

.cardCover {
  position: absolute;
  width: $card-width;

  &:first-of-type {
    cursor: pointer;
  }

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-card-width;
  }
}

.flippedCard {
  transform: translateX(calc($card-width + $card-x-gap));

  @media screen and (max-width: $small-content-max-width-bp) {
    transform: translateX(calc($small-card-width + $card-x-gap));
  }
}
</style>
