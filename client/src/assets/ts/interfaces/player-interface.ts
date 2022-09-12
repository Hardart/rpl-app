export interface Player {
   email: string
   name: string
   last_name: string
   full_name?: string
   password?: string
   role?: string
   bets?: number[]
   points: number
}

export interface PlayersData {
   players: Player[]
   message?: string
   errors?: string[]
}
