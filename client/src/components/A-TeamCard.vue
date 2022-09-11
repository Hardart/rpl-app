<template>
   <div class="teams">
      <ATeamCardItem :team="homeTeam" :show-bet-score="showBetScore" />
      <ATeamCardItem :team="awayTeam" :show-bet-score="showBetScore" />
   </div>
</template>

<script setup lang="ts">
   import type { Event } from '@/assets/ts/interfaces/event-interface'
   import ATeamCardItem from './A-TeamCardItem.vue'

   import { teamsBundle } from '@/helpers'
   import { useBetStore } from '@/stores'

   const props = defineProps<{
      event: Event
      showBetScore?: boolean
   }>()

   const betGame = useBetStore().getFinishedBet(props.event.id)
   const { awayTeam, homeTeam } = teamsBundle(props.event, betGame)
</script>

<style lang="scss"></style>
