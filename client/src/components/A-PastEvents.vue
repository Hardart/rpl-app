<template>
   <div v-for="round in events[0].round">
      <h1>Раунд {{ round }}</h1>
      <div class="grid childs-w-100">
         <template v-for="event in events">
            <div v-if="event.round == round">
               <ABetCard :event="event" :show-bet="false" />
            </div>
         </template>
         <div v-intersection="$emit('more')" class="observer"></div>
      </div>
      <hr />
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
      height: 10px;
      margin-left: 15px;
   }

   hr {
      margin-bottom: 15px;
   }
</style>
