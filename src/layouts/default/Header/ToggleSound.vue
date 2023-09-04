<script setup lang="ts">
import { computed } from 'vue'

import SpeakerWave from '@ui/icons/SpeakerWave.vue'
import SpeakerXMark from '@ui/icons/SpeakerXMark.vue'
import { useInterfaceStore } from '@stores/interface.ts'

const interfaceStore = useInterfaceStore()
const isSoundEnabled = computed(() => interfaceStore.isSoundEnabled)
</script>

<template>
  <div :class="$style.root" @click="interfaceStore.toggleSound()">
    <SpeakerWave v-if="isSoundEnabled" />
    <SpeakerXMark v-if="!isSoundEnabled" />
    <span :class="$style.title">
      {{ isSoundEnabled ? 'Выключить' : 'Включить' }} звуки
    </span>
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  cursor: pointer;
  height: 100%;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  opacity: 0.8;
  color: $white;
  transition: opacity 50ms ease-in-out;

  &:hover {
    opacity: 1;
  }
}

.title {
  margin-left: 8px;
  font-size: 17px;
  font-weight: 500;

  @media screen and (max-width: 650px) {
    display: none;
  }
}
</style>
