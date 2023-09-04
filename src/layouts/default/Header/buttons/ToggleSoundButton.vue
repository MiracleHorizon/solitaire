<script setup lang="ts">
import { computed } from 'vue'

import SpeakerWave from '@ui/icons/SpeakerWave.vue'
import SpeakerXMark from '@ui/icons/SpeakerXMark.vue'
import HeaderButton from './HeaderButton.vue'
import { useInterfaceStore } from '@stores/interface.ts'

const interfaceStore = useInterfaceStore()
const isSoundEnabled = computed(() => interfaceStore.isSoundEnabled) // TODO: Проверить необходимость computed
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
