<script setup lang="ts">
import { computed } from 'vue'

import Card from '@components/game/Card.vue'
import CardCover from '@ui/CardCover.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
const reserve = computed(() => gameStore.reserve)
</script>

<template>
  <div :class="$style.root">
    <CardCover :class="$style.cardCover" @click="gameStore.flipReserve()" />
    <CardCover :class="[$style.cardCover, $style.flippedCard]" />
    <Card
      v-for="(card, index) of reserve"
      :card="card"
      :style="{ zIndex: card.isFlipped ? reserve.length + 1 - index : 1 }"
      :class="[card.isFlipped && $style.flippedCard]"
      @click="gameStore.flipCard(card.id)"
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
