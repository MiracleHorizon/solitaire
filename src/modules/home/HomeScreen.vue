<script setup lang="ts">
import ButtonPlayGame from './ButtonPlayGame.vue'
import LinkSettings from './LinkSettings.vue'
</script>

<template>
  <div :class="$style.root">
    <article :class="$style.titleArticle">
      <h1 :class="$style.title">Пасьянс "Косынка"</h1>
    </article>

    <main :class="$style.content">
      <ButtonPlayGame />
    </main>
  </div>

  <LinkSettings :class="$style.linkSettings" />
</template>

<style module lang="scss">
@import '@styles/variables';

.root {
  height: calc(100dvh - $header-height);
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 20dvh;
  flex-direction: column;
}

.titleArticle {
  width: 100%;
  padding-top: 24px;
  margin-bottom: 24px;
  text-align: center;
}

.title {
  font-size: 38px;
  font-weight: 500;
  color: $white;
}

@media screen and (width <= 768px) {
  .title {
    font-size: 28px;
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.linkSettings {
  position: fixed;
  left: 16px;
  bottom: 16px;
}
</style>
