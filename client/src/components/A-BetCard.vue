<template>
   <div class="bet-card">
      <div class="bet-card__header">{{ event.id }} | {{ eventDate }} | Раунд {{ event.round }}</div>
      <div class="bet-card__body">
         <ATeamCard :event="event" />
      </div>
      <div class="bet-card__footer" v-if="event.status == EventStatus.notStarted">
         <button @click="bet.show(event.id)" class="btn btn-success w-100" :disabled="usePlayerStore().isBetDone(event.id) || bet.isDisabled.value">{{ buttonText }}</button>
      </div>
      <BetInput :bet="bet" v-if="bet.open.value" :class="{ open: event.id == bet.cardID.value }" />
   </div>
</template>

<script setup lang="ts">
   import ATeamCard from './A-TeamCard.vue'
   import BetInput from './UI/BetInput.vue'
   import Bet from '@/features/Bet-class'
   import { usePlayerStore } from '@/stores'
   import { EventStatus, BetButtonText } from '@/assets/ts/enums/status-enum'
   import type { Event } from '@/assets/ts/interfaces/event-interface'
   import { fixEventTime } from '@/helpers'
   import { computed } from 'vue'
   const bet = new Bet()
   const props = defineProps<{
      event: Event
   }>()
   const eventDate = new Date(fixEventTime(props.event.start_at)).toLocaleString()
   const buttonText = computed(() => (usePlayerStore().isBetDone(props.event.id) || bet.isDisabled.value ? BetButtonText.done : BetButtonText.make))
</script>

<style lang="scss"></style>
