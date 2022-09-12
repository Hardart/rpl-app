import { defineStore } from 'pinia'
import { useAlertStore, useBetStore } from '@/stores'
import type { Player } from '@/assets/ts/interfaces/player-interface'
import type { NewBet } from '@/assets/ts/interfaces/bet-interface'
import playerAPI from '@/api/player-api'
import JWT from '@/features/Token-class'

let playerLoginState: (v: unknown) => void
const promise = new Promise((res) => {
   playerLoginState = res
})
export const usePlayerStore = defineStore('user', {
   state: () => ({
      player: null as Player | null,
   }),
   getters: {
      isLogin: (state) => state.player !== null,
      isReady: () => promise,
      isBetDone: (state) => (eventId: number) => {
         if (!state.player) return false
         if (!state.player.bets) return false
         return state.player.bets.includes(eventId)
      },
   },
   actions: {
      async registration(player: Player) {
         const res = await playerAPI.registration(player)
         if (res.message) return useAlertStore().addAlert('Ошибка', res.message)
         JWT.setToken(res.token)
         if (!JWT.accessToken) return useAlertStore().addAlert('Предупреждение', 'Проблемы с токеном игрока')
         this.player = JWT.getPlayerInfo(JWT.accessToken)
      },

      async login({ email, password }: { email: string; password: string }) {
         const token = await playerAPI.login(email, password)
         JWT.setToken(token)
         if (!JWT.accessToken) return useAlertStore().addAlert('Предупреждение', 'Проблемы с токеном игрока')
         this.player = JWT.getPlayerInfo(JWT.accessToken)
      },

      async autoLogin() {
         let res = await playerAPI.check()
         if (res.message) return playerLoginState(true)
         if (!JWT.accessToken) return useAlertStore().addAlert('Предупреждение', 'Проблемы с токеном игрока')
         this.player = JWT.getPlayerInfo(JWT.accessToken)
         playerLoginState(true)
      },

      async logout() {
         this.player = null
         JWT.cleanTokensData()
         useBetStore().myBets = []
         return true
      },

      async makeBet(bet: NewBet[]) {
         if (!this.player) return useAlertStore().addAlert('Предупреждение', 'Проблемы с авторизацией')
         const { token, bets } = await playerAPI.makeBet(bet)
         if (!token) return useAlertStore().addAlert('Информация', 'При новой ставке проблема с токеном')
         useBetStore().setBets(bets)
         JWT.setToken(token)
         if (!JWT.accessToken) return useAlertStore().addAlert('Предупреждение', 'Проблемы с токеном игрока')
         this.player = JWT.getPlayerInfo(JWT.accessToken)
      },

      setPlayerPoints(points: number) {
         if (!this.player) return useAlertStore().addAlert('Предупреждение', 'Проблемы начислением очков')
         this.player.points = points
      },

      async deleteOne(email: string) {
         const res = await playerAPI.delete(email)
         if (res.email) return useAlertStore().addAlert('Информация', `Пользователь ${res.last_name} ${res.name.charAt(0)}. удалён`)
         return useAlertStore().addAlert('Ошибка', 'Проблемы с удалением игрока')
      },

      async setNewAdmin(email: string) {
         const { responseStatus, message } = await playerAPI.setNewAdmin(email)
         return { responseStatus, message }
      },
   },
})
