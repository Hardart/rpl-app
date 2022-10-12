<template>
   <header v-if="!isMobileLandscape">
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
   }
</style>
