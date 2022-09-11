<template>
   <div class="team">
      <div class="team__logo"><img :src="team.logo" alt="" /></div>
      <h5 class="team__name">{{ shortName(team.name) }}</h5>
      <h3 class="team__score" v-if="team.game_status == EventStatus.finished">{{ team.game_score }}</h3>
      <h3 class="team__bet" v-if="typeof team.bet_score == 'number' && showBetScore">{{ team.bet_score }}</h3>
   </div>
</template>

<script setup lang="ts">
   import type { Team } from '@/assets/ts/interfaces/event-interface'
   import { shortName } from '@/helpers'
   import { EventStatus } from '@/assets/ts/enums/status-enum'

   defineProps<{
      team: Team
      showBetScore?: boolean
   }>()
</script>

<style lang="scss"></style>
