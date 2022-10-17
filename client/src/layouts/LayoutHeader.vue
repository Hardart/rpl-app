<template>
  <header :class="{ 'mobile-menu': isMobileLandscape }">
    <slot />
  </header>
</template>

<script setup lang="ts">
  import { isMobileLandscape } from '@/helpers'
</script>

<style lang="scss">
  header {
    padding: 20px 0;
    background-color: $dark;

    &.mobile-menu {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 0;
      background-color: $dark;
      z-index: 1;
    }
  }
</style>
