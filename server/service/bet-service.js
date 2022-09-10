const { User, Bet } = require('../models')
const tokenService = require('./token-service')
const eventsService = require('./events-service')

class BetService {
   async getAllBets() {
      const bets = await this.#getAllBets()
      return bets
   }

   async makeNewBet(email, newBets) {
      const player = await this.#getPlayerInfo(email)
      const bets = player.bets.length > 0 ? this.#addBetToPlayerBets(player.bets, newBets) : this.#newBet(email, newBets)
      const { name, last_name, role } = await this.#addBetIDToPlayerInfo(player.data, newBets)
      const token = tokenService.generateToken({ email, name, last_name, role, bets, points: player.data.points })
      return { token, bets }
   }

   async getAllMyBets(email) {
      const player = await this.#getPlayerInfo(email)
      if (player.bets.length == 0) return { bets: [], points: 0 }
      const finishedEvents = await eventsService.finished()
      this.#updateBetStatus(player.bets, player.data, finishedEvents)

      return { bets: player.bets, points: player.data.points }
   }

   async #getPlayerInfo(email) {
      const playerData = await User.findOne({ email })
      const playerBets = await Bet.findOne({ player_email: email })
      const player = {
         data: playerData,
         bets: playerBets.player_bets,
      }
      return player
   }

   async #getAllBets() {
      return await Bet.find()
   }

   async #newBet(email, bet) {
      const player = await Bet.create({
         player_email: email,
         player_bets: bet,
      })
      return player.player_bets
   }

   async #addBetToPlayerBets(bets, bet) {
      bets = [...bets, ...bet]
      return bets
   }

   async #addBetIDToPlayerInfo(player, betArray) {
      betArray.forEach((bet) => {
         player.bets.push(bet.event_id)
      })
      return player
   }

   async #updateBetStatus(bets, player, finishedEvents) {
      bets.forEach((bet) => {
         if (!bet.status) {
            finishedEvents.find((event) => {
               if (event.id == bet.event_id) {
                  player.points = this.#countPoints(bet, event, player.points)
               }
            })
         }
      })
   }

   #countPoints(bet, event, points) {
      bet.winner_code = event.winner_code
      bet.status = true
      const betScore = `${bet.home_score}${bet.away_score}`
      const eventScore = `${event.home_score}${event.away_score}`
      if (betScore === eventScore) return (points += 3)
      if (bet.bet_code == event.winner_code) return (points += 2)
      return points
   }
}

module.exports = new BetService()
