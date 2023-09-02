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
    <CardCover
      :style="{ cursor: 'pointer' }"
      :class="[$style.card, $style.left]"
      @click="handleFlipAll"
    />
    <CardCover :class="[$style.card, $style.flipped]" />
    <Card
      v-for="(card, index) of reserve"
      :card="card"
      :style="{
        zIndex: card.isFlipped ? reserve.length + 1 - index : 1,
        boxShadow: 'none'
      }"
      :class="[$style.card, card.isFlipped && $style.flipped]"
      @click="handleClickCard(card)"
    />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';
@import '@styles/breakpoints';

.root {
  position: relative;
  height: $height;

  @media screen and (max-width: $tablet) {
    height: $height-small;
  }
}

.card {
  position: absolute;
  width: $card-width;

  @media screen and (max-width: $tablet) {
    width: $card-width-small-screen;
  }
}

.flipped {
  transform: translateX(calc($card-width + $column-gap));

  @media screen and (max-width: $tablet) {
    left: calc($card-width-small-screen + $column-gap-small-screen);
  }
}
</style>
