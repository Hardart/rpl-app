<template>
   <div class="settings">
      <span class="btn btn-close" @click="openAdminSettings" v-html="Icons.close"></span>
      <div class="section">
         <div class="container">
            <ASettingsNavList />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
   import Icons from '@/features/Icons'
   import ASettingsNavList from './A-SettingsNavList.vue'
   import { openAdminSettings } from '@/features/adminSettings'
</script>

<style lang="scss">
   .settings {
      position: fixed;
      color: $muted;
      background-color: $dark;
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      z-index: 1000;
   }
</style>
