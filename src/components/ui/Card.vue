<script setup lang="ts">
import { StringTransformer } from '@utils/StringTransformer'
import type { Card } from '@entities/Card.ts'
import cardBack from '@images/cards/card_back.png'

defineProps<{ card: Card }>()
</script>

<template>
  <div :class="$style.root">
    <img
      :src="card.isFlipped ? card.image : cardBack"
      :alt="
        card.isFlipped
          ? [StringTransformer.capitalizeWord(card.suit), card.rank].join(' ')
          : 'Playing card'
      "
    />
  </div>
</template>

<style module lang="scss">
@import '@styles/mixins';

.root {
  cursor: pointer;
  border-radius: 5px;

  img {
    @include no-select;
    pointer-events: none;
  }
}
</style>
