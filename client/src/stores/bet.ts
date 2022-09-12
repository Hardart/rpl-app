import { defineStore } from 'pinia'
import { useAlertStore, usePlayerStore } from '@/stores'
import type { NewBet } from '@/assets/ts/interfaces/bet-interface'
import playerAPI from '@/api/player-api'
import JWT from '@/features/Token-class'

export const useBetStore = defineStore('bet', {
   state: () => ({
      myBets: [] as NewBet[],
      isUpdated: false,
   }),
   getters: {
      getFinishedBet: (state) => (eventID: number) => state.myBets.find((bet) => bet.event_id == eventID),
   },
   actions: {
      async loadBets() {
         const res = await playerAPI.getBets()
         if (res.message) return useAlertStore().addAlert('Ошибка', res.message)
         usePlayerStore().setPlayerPoints(res.points)
         this.myBets = res.bets
         this.isUpdated = true
      },

      async saveBets(passBets: NewBet[]) {
         const { token, bets } = await playerAPI.makeBet(passBets)
         JWT.setToken(token)
         this.myBets = bets
         if (!JWT.accessToken) return useAlertStore().addAlert('Ошибка', 'Проблемы с токеном игрока при сохранении ставок')
         usePlayerStore().player = JWT.getPlayerInfo(JWT.accessToken)
      },

      setBets(bets: NewBet[]) {
         this.myBets = bets
      },
   },
})
