<script setup lang="ts">
import { computed } from 'vue'

import SpeakerWave from '@ui/icons/SpeakerWaveIcon.vue'
import SpeakerXMark from '@ui/icons/SpeakerXMarkIcon.vue'
import HeaderButton from './ButtonHeader.vue'
import { useInterfaceStore } from '@stores/interface.ts'

const interfaceStore = useInterfaceStore()
const isSoundEnabled = computed(() => interfaceStore.isSoundEnabled)
</script>

<template>
  <HeaderButton
    :title="`${isSoundEnabled ? 'Выключить' : 'Включить'} звуки`"
    @click="interfaceStore.toggleSound()"
  >
    <SpeakerWave v-if="isSoundEnabled" />
    <SpeakerXMark v-if="!isSoundEnabled" />
  </HeaderButton>
</template>
