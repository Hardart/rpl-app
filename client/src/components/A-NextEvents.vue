<template>
   <div class="grid childs-w-100">
      <template v-for="(event, index) in events">
         <div v-if="event.status == EventStatus.notStarted && checkDateOfGame(event.start_at)">
            <ABetCard :event="event" :round="event.round" />
         </div>
      </template>
   </div>
</template>

<script setup lang="ts">
   import ABetCard from './A-BetCard.vue'
   import type { Event } from '@/assets/ts/interfaces/event-interface'
   import { EventStatus } from '@/assets/ts/enums/status-enum'
   import { useEventsStore, useBetStore } from '@/stores'
   import { checkDateOfGame } from '@/helpers'
   if (useBetStore().myBets.length < 1) await useBetStore().loadBets()
   if (useEventsStore().next.length < 1) await useEventsStore().loadNextRound()
   const events: Event[] = useEventsStore().getNext
</script>

<style lang="scss"></style>
