import { BetStatus } from '@/assets/ts/enums/status-enum'
import type { NewBet } from '@/assets/ts/interfaces/bet-interface'
import type { Event, Team, Teams } from '@/assets/ts/interfaces/event-interface'

const cities: string[] = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Воронеж', 'Самара', 'Грозный']

export function shortName(teamName: string): string {
   let shortTeamName = teamName.replace(/(ПФК\s|ФК\s)/g, '')
   return cutTeamCity(shortTeamName, cities)
}

function cutTeamCity(teamName: string, cities: string[]): string {
   cities.forEach((city) => {
      teamName = teamName.includes(city) ? teamName.replace(` ${city}`, '') : teamName
   })
   return teamName
}

export function checkDateOfGame(eventDate: number): boolean {
   if (fixEventTime(eventDate) > Date.now()) return true
   return false
}

export function checkBetStatus(playerBet: NewBet, eventScore: string): string {
   if (`${playerBet.home_score}${playerBet.away_score}` === eventScore) return BetStatus.score
   if (playerBet.bet_code === playerBet.winner_code) return BetStatus.team
   if (!playerBet.status) return BetStatus.no_info
   return BetStatus.false
}

export function teamsBundle(event: Event, bet: NewBet | undefined): Teams {
   const awayTeam: Team = {
      logo: event.away_team_logo,
      name: event.away_team,
      game_status: event.status,
      game_score: event.away_score,
      bet_score: bet?.away_score,
   }
   const homeTeam: Team = {
      logo: event.home_team_logo,
      name: event.home_team,
      game_status: event.status,
      game_score: event.home_score,
      bet_score: bet?.home_score,
   }

   return { awayTeam, homeTeam }
}

export function fixEventTime(eventDate: number): number {
   let hour = new Date(eventDate).getHours()
   let date = new Date(eventDate).setHours(hour + 2)
   let minutes = new Date(date).getMinutes()
   date = new Date(date).setMinutes(minutes + 48)

   return new Date(date).valueOf()
}

export function eventWithNoBets(nextRoundEvents: Event[], playerBets: number[] | undefined): NewBet[] {
   if (!playerBets) return []
   const pastEventsWithNoBet = nextRoundEvents.filter((event) => !checkDateOfGame(event.start_at) && !isPlayerMadeBet(event.id, playerBets))
   let defaultBets: NewBet[] = []
   pastEventsWithNoBet.forEach((event) => defaultBets.push(createEmptyBet(event.id)))
   return defaultBets
}

export function createEmptyBet(eventID: number): NewBet {
   return {
      event_id: eventID,
      status: false,
      home_score: 0,
      away_score: 0,
      winner_code: null,
      bet_code: 3,
   }
}

function isPlayerMadeBet(eventID: number, bets: number[]): boolean {
   return bets.includes(eventID)
}
