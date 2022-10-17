import { defineStore } from 'pinia'
import eventsAPI from '@/api/events-api'
import { ref } from 'vue'
import type { AccordeonEvents, Event, Events, EventSortBy, TeamStanding } from '@/assets/ts/interfaces/event-interface'

export const useEventsStore = defineStore({
  id: 'events',
  state: () => ({
    all: [] as Event[],
    finished: [] as Events[],
    next: [] as Event[],
    standingsTable: [] as TeamStanding[],
    isLoading: false,
  }),
  getters: {
    getNext: (state) => state.next,
    getEventByID: (state) => (betID: number) => state.all.find((event) => event.id == betID) as Event,
    getEventScore: (state) => (betID: number) => {
      const e = state.all.find((event) => event.id == betID)
      return `${e?.home_score}${e?.away_score}`
    },
    getEventsForAccordeon: (state) => {
      let accordeon: AccordeonEvents[] = []
      const finished = state.finished
      finished.forEach((e) => {
        accordeon.push({ open: ref(false), ...e })
      })
      return accordeon
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
    },
    async loadAll() {
      const { next, past } = await eventsAPI.all()
      this.all = [...past, ...next]
      this.next = next
    },
    async loadTable() {
      const data = await eventsAPI.standings()
      data.sort((a, b) => (a.position > b.position ? 1 : -1))
      this.standingsTable = data
    },
    async update() {
      this.isLoading = true
      const res = await eventsAPI.update()
      await this.loadAll()
      this.isLoading = false
    },
    // пока не используется
    sortFutureEvents(sortBy: EventSortBy) {
      this.next.sort((a: Event, b: Event) => (sortBy === 'asc' ? a.start_at - b.start_at : b.start_at - a.start_at))
    },
  },
})
