import type { Player } from '@/assets/ts/interfaces/player-interface'
import type { NewBet } from '@/assets/ts/interfaces/bet-interface'
import instance from './instance'

interface ResponseData {
   token: string
   bets: NewBet[]
   message?: string
   errors?: string[]
   points: number
}

export default {
   async registration(player: Player) {
      const { data } = await instance.post<ResponseData>('/registration', player)
      return data
   },

   async login(email: string, password: string) {
      const { data } = await instance.post<string>('/login', { email, password })
      return data
   },

   async check() {
      let { data } = await instance.get('check', {
         headers: {
            app401: true,
         },
      })
      return data
   },
   async makeBet(bet: NewBet[]) {
      const { data } = await instance.post<ResponseData>('/new-bet', bet)
      return data
   },

   async getBets() {
      const { data } = await instance.get<ResponseData>('/my-bets')
      return data
   },
}
