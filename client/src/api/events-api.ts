import type { Event, TeamStanding } from '@/assets/ts/interfaces/event-interface'
import instance from './instance'

interface Box {
   next: Event[]
   past: Event[]
}

export default {
   async all() {
      const { data } = await instance.get<Box>('/load-all')
      console.log(data)
      return data
   },

   async update() {
      const { data } = await instance.get('/update')
      return data
   },

   async past() {
      const { data } = await instance.get<Event[]>('/past?limit=8')
      return data
   },

   async future() {
      const { data } = await instance.get<Event[]>('/future')
      return data
   },

   async standings() {
      const { data } = await instance.get<TeamStanding[]>('/standings')
      return data
   },
}
