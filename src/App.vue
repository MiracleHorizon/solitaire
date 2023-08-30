<script setup lang="ts"></script>

<template>
  <div :class="$style.root">
    <router-view />
  </div>
</template>

<style module lang="scss">
.root {
  width: 100vw;
  height: 100vh;
}
</style>
