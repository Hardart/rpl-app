<template>
   <div class="grid childs-w-100" v-if="betStore.myBets.length > 0">
      <template v-for="bet in betStore.myBets">
         <div>
            <div class="bet-card">
               <ATeamCard :event="event(bet.event_id)" :show-bet-score="true" />
               <div class="bet-card__status">
                  <div class="rotate-180">{{ checkBetStatus(bet, score(bet.event_id)) }}</div>
               </div>
            </div>
         </div>
      </template>
   </div>
   <h1 v-else>Пока нет ни одной ставки</h1>
</template>

<script setup lang="ts">
   import ATeamCard from '../components/A-TeamCard.vue'
   import { useEventsStore, useBetStore, usePlayerStore, useAlertStore } from '@/stores'
   import { checkBetStatus, eventWithNoBets } from '@/helpers'

   const betStore = useBetStore()
   const eventStore = useEventsStore()
   const noBetEvents = eventWithNoBets(eventStore.next, usePlayerStore().player?.bets)
   if (noBetEvents?.length > 0) {
      await useBetStore().saveBets(noBetEvents)
      useAlertStore().addAlert('Информация', 'Данных о прошедших ставках пока нет')
   }
   if (betStore.myBets.length < 1) await betStore.loadBets()
   if (eventStore.next.length < 1) await eventStore.loadNextRound()
   const event = (id: number) => eventStore.getEventByID(id)
   const score = (id: number) => eventStore.getEventScore(id)
</script>

<style lang="scss"></style>
