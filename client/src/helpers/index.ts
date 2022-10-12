import { ref } from 'vue'
import { BetStatus, EventStatus } from '@/assets/ts/enums/status-enum'
import type { NewBet } from '@/assets/ts/interfaces/bet-interface'
import type { Event, Team, Teams } from '@/assets/ts/interfaces/event-interface'
import Bet from '@/features/Bet-class'

const cities: string[] = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Воронеж', 'Самара', 'Грозный']

export const delay = (ms: number = 0) => new Promise((res) => setTimeout(() => res(true), ms))

export function shortName(teamName: string): string {
   let shortTeamName = cutTeamPrefix(teamName)
   shortTeamName = cutTeamCity(shortTeamName, cities)
   shortTeamName = shortTeamName.includes(' ')
      ? shortTeamName
           .split(' ')
           .map((word, i) => (i == 0 ? `${word.charAt(0)}.` : word))
           .join(' ')
      : shortTeamName
   return shortTeamName
}

export function checkDateOfGame(eventDate: number): boolean {
   if (fixEventTime(eventDate) > Date.now()) return true
   return false
}

export function checkBetStatus(playerBet: NewBet, eventScore: string, eventStatus: string): string {
   if (eventStatus == EventStatus.inprogress) return BetStatus.inprogress
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
   let date = new Date(eventDate).setHours(hour + 3)
   // let minutes = new Date(date).getMinutes()
   // date = new Date(date).setMinutes(minutes + 13)

   return new Date(date).valueOf()
}

export function eventWithNoBets(nextRoundEvents: Event[], playerBets: number[] | undefined): NewBet[] {
   if (!playerBets) return []
   const pastEventsWithNoBet: Event[] = nextRoundEvents.filter((event) => !checkDateOfGame(event.start_at) && !isPlayerMadeBet(event.id, playerBets))
   let defaultBets: NewBet[] = []
   pastEventsWithNoBet.forEach((event) => defaultBets.push(Bet.createEmptyBet(event.id)))
   return defaultBets
}

function isPlayerMadeBet(eventID: number, bets: number[]): boolean {
   return bets.includes(eventID)
}

function cutTeamPrefix(teamName: string): string {
   return teamName.replace(/(ПФК\s|ФК\s)/g, '')
}

function cutTeamCity(teamName: string, cities: string[]): string {
   cities.forEach((city) => {
      teamName = teamName.includes(city) ? teamName.replace(` ${city}`, '') : teamName
   })
   return teamName
}

export function changeState(value: boolean): boolean {
   return (value = !value)
}

export function changeSVG() {
   const elements = document.querySelectorAll('[icon-size]') as NodeListOf<HTMLLIElement>
   if (!elements || elements.length < 1) return
   elements.forEach((el) => {
      const ratio = Number(el.getAttribute('icon-size'))
      const svg = el.children[0] as HTMLElement
      setElementSize(svg, ratio)
   })
}

function setElementSize(el: HTMLElement, ratio: number) {
   const width = el.clientWidth
   const height = el.clientHeight
   el.setAttribute('width', `${width * ratio}`)
   el.setAttribute('height', `${height * ratio}`)
}

export const isMobilePortrait = ref(false)
export const isMobileLandscape = ref(false)
export const getScreenWidth = () => {
   const small = 640
   const medium = 960
   isMobilePortrait.value = window.innerWidth < small
   isMobileLandscape.value = window.innerWidth < medium
   // if (window.matchMedia('(orientation: portrait)').matches) {
   //    console.log('portrait')
   // }

   // if (window.matchMedia('(orientation: landscape)').matches) {
   //    console.log('landscape')
   // }
}
