<script setup lang="ts">
   import ANav from './components/A-Nav.vue'
   import AAlert from './components/UI/A-Alert.vue'

   import { useAlertStore } from '@/stores/alerts'
   const alertStore = useAlertStore()
</script>

<template>
   <ANav />
   <Teleport to="body" v-if="alertStore.alerts.length > 0">
      <div class="alerts">
         <a-alert v-for="alert in alertStore.alerts" :alert="alert" @change="alertStore.delete" />
      </div>
   </Teleport>
   <section class="section">
      <div class="container">
         <router-view v-slot="{ Component }">
            <transition name="slide" mode="out-in">
               <component :is="Component" />
            </transition>
         </router-view>
      </div>
   </section>
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
