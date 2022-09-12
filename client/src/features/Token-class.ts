const LOCAL_ACCESS_NAME = 'auth_accessToken'
import type { Player } from '@/assets/ts/interfaces/player-interface'
import jwt_decode from 'jwt-decode'

class Tokens {
   setToken(access: string) {
      localStorage.setItem(LOCAL_ACCESS_NAME, access)
   }
   cleanTokensData() {
      localStorage.removeItem(LOCAL_ACCESS_NAME)
   }

   getJWTPayload(token: string) {
      return this.parseJWT(token).payload
   }

   parseJWT(token: string) {
      let parts = token.split('.')
      return {
         header: this.parsePart(parts[0]),
         payload: this.parsePart(parts[1]),
         sign: parts[2],
      }
   }

   parsePart(str: string) {
      return JSON.parse(window.atob(str))
   }

   decode(str: string) {
      return jwt_decode(str)
   }

   getPlayerInfo(str: string) {
      const { email, name, last_name, role, bets, points, full_name } = this.decode(str) as Player
      return { email, name, last_name, role, bets, points, full_name }
   }

   get accessToken() {
      return localStorage.getItem(LOCAL_ACCESS_NAME)
   }
}

export default new Tokens()
