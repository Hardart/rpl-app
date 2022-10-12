<script setup lang="ts">
   import LayoutSection from './layouts/LayoutSection.vue'
   import LayoutHeader from './layouts/LayoutHeader.vue'
   import ANav from './components/A-Nav.vue'
   import AAlert from './components/UI/A-Alert.vue'
   import { useAlertStore } from '@/stores/alerts'
   import { getScreenWidth } from '@/helpers'
   import LayoutMobileMenu from './layouts/LayoutMobileMenu.vue'

   const alertStore = useAlertStore()
   getScreenWidth()
   window.addEventListener('resize', getScreenWidth)
</script>

<template>
   <LayoutHeader><ANav /></LayoutHeader>
   <Teleport to="body" v-if="alertStore.alerts.length > 0">
      <div class="alerts">
         <a-alert v-for="alert in alertStore.alerts" :alert="alert" @change="alertStore.delete" />
      </div>
   </Teleport>
   <LayoutSection>
      <router-view v-slot="{ Component }">
         <transition name="slide" mode="out-in">
            <component :is="Component" />
         </transition>
      </router-view>
   </LayoutSection>
   <LayoutMobileMenu><ANav /></LayoutMobileMenu>
</template>

<style lang="scss">
   .slide-enter-active {
      animation: slideIn 0.3s ease;
   }

   .slide-leave-active {
      animation: slideOut 0.3s ease;
   }

   @keyframes slideIn {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }

   @keyframes slideOut {
      from {
         opacity: 1;
      }
      to {
         opacity: 0;
      }
   }
</style>
