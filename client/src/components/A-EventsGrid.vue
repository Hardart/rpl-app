<template>
   <div class="grid childs-w-100 childs-w-50@s childs-w-33@l">
      <template v-for="event in events">
         <div v-if="event.round == round">
            <ABetCard :event="event" :show-bet="false" />
         </div>
      </template>
   </div>
</template>

<script setup lang="ts">
   import type { Event } from '@/assets/ts/interfaces/event-interface'
   import ABetCard from './A-BetCard.vue'

   defineProps<{
      events: Event[]
      round: number
   }>()
</script>

<style></style>
