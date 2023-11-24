<script setup lang="ts">
import PlayGameButton from './PlayGameButton.vue'
import LinkSettings from './LinkSettings.vue'
</script>

<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <article :class="$style.titleArticle">
        <h1>Пасьянс "Косынка"</h1>
      </article>
    </header>
    <main :class="$style.content">
      <PlayGameButton />
    </main>
    <LinkSettings />
  </div>
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  width: 100%;
}

.header {
  width: 100%;
  padding-top: 24px;
  text-align: center;
}

.titleArticle {
  margin-bottom: 24px;

  h1 {
    font-size: 38px;
    font-weight: 500;
    color: $white;
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
