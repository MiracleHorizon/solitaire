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
    <CardCover :class="[$style.cardCover, $style.flipped]" />
    <Card
      v-for="(card, index) of reserve"
      :card="card"
      :style="{ zIndex: card.isFlipped ? reserve.length + 1 - index : 1 }"
      :class="[card.isFlipped && $style.flipped]"
      @click="handleClickCard(card)"
    />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  position: relative;
  height: $height;
}

.cardCover {
  position: absolute;

  &:first-of-type {
    cursor: pointer;
  }
}

.flipped {
  transform: translateX(calc($card-width + $column-gap));
}
</style>
