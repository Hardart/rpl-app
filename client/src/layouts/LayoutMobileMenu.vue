<template>
   <div class="mobile-menu" v-if="isMobileLandscape">
      <slot />
   </div>
</template>

<script setup lang="ts">
   import { isMobileLandscape } from '@/helpers'
</script>

<style lang="scss">
   .mobile-menu {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 0;
      background-color: $dark;
   }
</style>
