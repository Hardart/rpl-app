<template>
   <h1>{{ name }}</h1>

   <div class="mb-10" v-for="player in data">
      <h3 @click="myBets">{{ player.name }}</h3>
      <template v-for="betArray in bet.data">
         <ul v-if="betArray.player_email == player.email">
            <li v-for="bet in betArray.player_bets">{{ bet.event_id }}</li>
         </ul>
      </template>
   </div>
</template>

<script setup lang="ts">
   import { getBets, getUsers } from '@/api/fetch'
   import type { PlayerBets } from '@/assets/ts/interfaces/bet-interface'
   import { reactive } from 'vue'

   defineProps<{
      name: string
   }>()

   const bet = reactive({
      data: [] as PlayerBets[] | null,
   })
   const myBets = async () => {
      const url = '/all-bets'
      const { bets, betsError, retryGetBets } = await getBets(url)
      bet.data = bets.value
   }
   const { data, error } = getUsers()
</script>

<style></style>
