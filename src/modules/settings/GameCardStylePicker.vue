<script setup lang="ts">
import { GameCardStyle, useInterfaceStore } from '@stores/interface'
import { Rank, Suit } from '@app-types/card'
import { getCardImagePath } from '@helpers/getCardImagePath'

const interfaceStore = useInterfaceStore()
const styleVariants = [
  {
    value: GameCardStyle.V1,
    imagePath: getCardImagePath({
      suit: Suit.HEARTS,
      rank: Rank.ACE,
      styleVariant: GameCardStyle.V1
    })
  },
  {
    value: GameCardStyle.V2,
    imagePath: getCardImagePath({
      suit: Suit.HEARTS,
      rank: Rank.ACE,
      styleVariant: GameCardStyle.V2
    })
  },
  {
    value: GameCardStyle.V3,
    imagePath: getCardImagePath({
      suit: Suit.HEARTS,
      rank: Rank.ACE,
      styleVariant: GameCardStyle.V3
    })
  }
]
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.content">
      <article :class="$style.titleArticle">
        <h2>Выберите стиль карт</h2>
      </article>
      <main :class="$style.contentMain">
        <div
          v-for="{ value, imagePath } in styleVariants"
          :key="value"
          :class="[
            $style.item,
            interfaceStore.gameCardStyle === value && $style.selectedItem
          ]"
          @click="interfaceStore.setGameCardStyle(value)"
        >
          <img :src="imagePath" alt="Game card style" />
        </div>
      </main>
    </div>
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 2vh;
  align-items: flex-start;
  justify-content: center;
}

.content {
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  padding-bottom: 6px;
  border-radius: 24px;
  margin: 6px 14px;
}

.titleArticle {
  width: 100%;
  text-align: center;
  color: $white;

  h2 {
    font-size: 24px;
    font-weight: 500;
  }
}

.contentMain {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 30px;
  padding: 24px;
  align-items: center;
}

.item {
  cursor: pointer;
  border-radius: 5px;
  transition: scale 80ms ease-in-out;
  border: 2px solid transparent;

  &:hover {
    scale: 1.08;
  }
}

.selectedItem {
  border-radius: 8px;
  border-color: red;
}
</style>
