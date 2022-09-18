<template>
   <Transition name="modal">
      <div class="settings" v-if="isOpen">
         <span class="btn btn-close" @click="isOpen = !isOpen" v-html="Icons.close"></span>
         <div class="section">
            <div class="container">
               <ASettingsNavList />
            </div>
         </div>
      </div>
   </Transition>
</template>

<script setup lang="ts">
   import Icons from '@/features/Icons'
   import ASettingsNavList from './A-SettingsNavList.vue'
   import { changeState, isOpen } from '@/features/adminSettings'
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
      transition: all 0.3s ease;
   }

   .modal-enter-from {
      opacity: 0;
   }

   .modal-leave-to {
      opacity: 0;
   }

   .modal-enter-from,
   .modal-leave-to {
      transform: scale(0.9);
   }
</style>
