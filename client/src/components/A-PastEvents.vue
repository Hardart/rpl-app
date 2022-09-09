<template>
   <div class="grid childs-w-100">
      <template v-for="event in events">
         <div>
            <ABetCard :event="event" :round="event.round" :show-bet="false" />
         </div>
      </template>
      <div v-intersection="$emit('more')" class="observer"></div>
   </div>
</template>
<script setup lang="ts">
   import ABetCard from './A-BetCard.vue'
   import { useEventsStore } from '@/stores'
   import { computed } from 'vue'
   const events = computed(() => useEventsStore().limited)
   defineEmits<{
      (e: 'more'): void
   }>()
</script>

<style lang="scss">
   .observer {
      display: block;
      width: 100%;
      height: 30px;
      margin-left: 15px;
      margin-bottom: 30px;
   }
</style>
