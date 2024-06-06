<script setup lang="ts">
import { UseImage } from '@vueuse/components'

import LoadingSpinner from '@ui/LoadingSpinner.vue'
import { IMAGES_ASSETS_PATH, pathForAssets } from '@site/config'

defineProps<{
  imagePath?: string
}>()
</script>

<template>
  <div :class="$style.root">
    <img
      :src="imagePath ?? pathForAssets(`${IMAGES_ASSETS_PATH}/card_place.png`)"
      :class="$style.image"
      alt="Playing card"
    />
    <!--    <UseImage-->
    <!--      :src="imagePath ?? pathForAssets(`${IMAGES_ASSETS_PATH}/card_place.png`)"-->
    <!--      :class="$style.image"-->
    <!--      alt="Playing card"-->
    <!--    >-->
    <!--      <template #loading>-->
    <!--        <div :class="$style.loading">-->
    <!--          <img-->
    <!--            :src="pathForAssets(`${IMAGES_ASSETS_PATH}/card_back.png`)"-->
    <!--            :class="$style.loadingImage"-->
    <!--            alt="Loading..."-->
    <!--          />-->
    <!--          <LoadingSpinner :class="$style.spinner" />-->
    <!--        </div>-->
    <!--      </template>-->
    <!--    </UseImage>-->
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';
@import '@styles/mixins';

.root {
  width: $card-width;
  height: $card-height;
  border-radius: 5px;
  z-index: 0;
  touch-action: none;

  @media screen and (max-width: $small-content-max-width-bp) {
    width: $small-card-width;
    height: $small-card-height;
  }

  .image {
    @include no-select;

    pointer-events: none;
  }
}

.loading {
  @include no-select;

  pointer-events: none;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: $white;

  .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    bottom: 50%;
    translate: -50% -50%;
    fill: $white;
  }

  .loadingImage {
    position: absolute;
  }
}
</style>
