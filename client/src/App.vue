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
         <RouterView />
      </div>
   </section>
</template>

<style lang="scss"></style>
