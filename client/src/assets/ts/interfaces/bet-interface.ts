export interface NewBet {
   event_id: number
   status: boolean
   home_score: number
   away_score: number
   winner_code: number | null
   bet_code: number
}

export interface PlayerBets {
   player_email: string
   player_bets: NewBet[]
}
