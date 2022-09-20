<template>
   <Transition name="modal">
      <div class="settings" v-if="isOpen">
         <div class="section">
            <div class="container">
               <a-close-button @click="closeModal" color="primary" />
               <ASettingsNavList />
            </div>
         </div>
      </div>
   </Transition>
</template>

<script setup lang="ts">
   import ASettingsNavList from './A-SettingsNavList.vue'
   import { isOpen, isOpenMobileMenu } from '@/features/adminSettings'

   const closeModal = () => {
      isOpen.value = false
      isOpenMobileMenu.value = false
   }
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
      overflow-y: auto;
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
