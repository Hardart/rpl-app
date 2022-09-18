import type { Ref } from 'vue'

export type EventSortBy = 'asc' | 'desc'
export interface Event {
   id: number
   date: string
   start_at: number
   status: string
   home_team: string
   away_team: string
   home_team_logo: string
   away_team_logo: string
   home_score: string
   away_score: string
   round: number
   winner_code: number | null
}

export interface Team {
   logo: string
   name: string
   game_status: string
   game_score: string
   bet_score?: number
}

export interface Teams {
   awayTeam: Team
   homeTeam: Team
}

export interface TeamStanding {
   name: string
   matches_total: string
   wins_total: string
   draws_total: string
   losses_total: string
   points_total: string
   position: number
}

export interface AccordeonEvents {
   open: Ref<boolean>
   round: number
   events: Event[]
}
