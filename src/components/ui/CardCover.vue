<script setup lang="ts">
import cardCover from '@images/cards/card_cover.png'
</script>

<template>
  <div :class="$style.root">
    <img :src="cardCover" alt="Card cover" />
  </div>
</template>

<style module lang="scss">
@import '@styles/mixins';

.root {
  z-index: 0;
  opacity: 0.4;

  img {
    @include no-select;
    pointer-events: none;
  }
}
</style>
