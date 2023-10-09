<script setup lang="ts">
import { GameCardStyle, useInterfaceStore } from '@stores/interface.ts'
import heartsAceV1Png from '@images/cards/hearts/hearts_ace_v1.png'
import heartsAceV2Png from '@images/cards/hearts/hearts_ace_v2.png'
import heartsAceV3Png from '@images/cards/hearts/hearts_ace_v3.png'

const interfaceStore = useInterfaceStore()
const styleVariants = [
  {
    value: GameCardStyle.V1,
    imagePath: heartsAceV1Png
  },
  {
    value: GameCardStyle.V2,
    imagePath: heartsAceV2Png
  },
  {
    value: GameCardStyle.V3,
    imagePath: heartsAceV3Png
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
