<script setup lang="ts">
import BaseCard from '@ui/BaseCard.vue'
import PlayCard from '@components/game/PlayCard.vue'
import { useGameStore } from '@stores/game.ts'

const gameStore = useGameStore()
</script>

<template>
  <div :class="$style.root">
    <BaseCard :class="$style.cardPlace" @click="gameStore.flipReserve" />
    <BaseCard :class="[$style.cardPlace, $style.toRight]" />
    <PlayCard
      v-for="(card, index) in gameStore.reserve"
      :key="card.id"
      :card="card"
      :style="{
        zIndex: card.isFlipped ? gameStore.reserve.length + 1 - index : 1
      }"
      :class="card.isFlipped && $style.toRight"
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

.cardPlace {
  position: absolute;
  width: $card-width;

  &:first-of-type {
    cursor: pointer;
  }

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-card-width;
  }
}

.toRight {
  transform: translateX(calc($card-width + $card-x-gap));

  @media screen and (max-width: $small-content-max-width-bp) {
    transform: translateX(calc($small-card-width + $card-x-gap));
  }
}
</style>
