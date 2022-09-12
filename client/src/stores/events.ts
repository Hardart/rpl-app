import { defineStore } from 'pinia'
import eventsAPI from '@/api/events-api'
import type { Event, EventSortBy } from '@/assets/ts/interfaces/event-interface'

export const useEventsStore = defineStore({
   id: 'events',
   state: () => ({
      all: [] as Event[],
      finished: [] as Event[],
      limited: [] as Event[],
      next: [] as Event[],
      isLoading: false,
      limit: 8,
   }),
   getters: {
      getNext: (state) => state.next,

      getEventByID: (state) => (betID: number) => state.all.find((event) => event.id == betID) as Event,
      getEventScore: (state) => (betID: number) => {
         const e = state.all.find((event) => event.id == betID)
         return `${e?.home_score}${e?.away_score}`
      },
   },
   actions: {
      async loadNextRound() {
         const res = await eventsAPI.future()
         this.next = res
         this.sortFutureEvents('asc')
         this.all = [...this.all, ...res]
      },
      async loadPastRounds() {
         const res = await eventsAPI.past()
         this.finished = res
         this.limited = res.filter((_, i) => i < this.limit)
         this.all = [...this.all, ...res]
      },
      async loadAll() {
         const { next, past } = await eventsAPI.all()
         this.all = [...past, ...next]
         this.finished = past
         this.next = next
      },
      async update() {
         this.isLoading = true
         const res = await eventsAPI.update()
         await this.loadAll()
         this.isLoading = false
      },
      sortFutureEvents(sortBy: EventSortBy) {
         this.next.sort((a: Event, b: Event) => (sortBy === 'asc' ? a.start_at - b.start_at : b.start_at - a.start_at))
      },
      addMoreFinished(limit: number = 8) {
         this.limit += limit
         this.limited = this.finished.filter((_, i) => i < this.limit)
      },
   },
})
