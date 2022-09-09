const { User, Bet } = require('../models')
const tokenService = require('./token-service')
const eventsService = require('./events-service')

class BetService {
   async getAllBets() {
      const bets = await this.#getAllBets()
      return bets
   }

   async makeNewBet(email, betArray) {
      const { player, playerBets } = await this.#getPlayerAndBets(email)
      const data = playerBets ? await this.#addBetToPlayerBets(playerBets, betArray) : await this.#newBet(email, betArray)
      const { name, last_name, role } = await this.#addBetIDToPlayerInfo(player, betArray)
      const token = tokenService.generateToken({ email, name, last_name, role, bets: player.bets, points: player.points })
      return { token, bets: data.player_bets }
   }

   async getAllMyBets(email) {
      const { player, playerBets } = await this.#getPlayerAndBets(email)
      if (!playerBets) return { bets: [], points: 0 }
      const finishedEvents = await eventsService.finished()
      await this.#updateBetStatus(playerBets, player, finishedEvents)

      return { bets: playerBets.player_bets, points: player.points }
   }

   async #getPlayerAndBets(email) {
      const player = await User.findOne({ email })
      const playerBets = await Bet.findOne({ player_email: email })
      return { player, playerBets }
   }

   async #getAllBets() {
      return await Bet.find()
   }

   async #newBet(email, bet) {
      return await Bet.create({
         player_email: email,
         player_bets: bet,
      })
   }

   async #addBetToPlayerBets(playerBets, bet) {
      playerBets.player_bets = [...playerBets.player_bets, ...bet]
      await playerBets.save()
      return playerBets
   }

   async #addBetIDToPlayerInfo(player, betArray) {
      betArray.forEach((bet) => {
         player.bets.push(bet.event_id)
      })
      await player.save()
      return player
   }

   async #updateBetStatus(bets, player, finishedEvents) {
      bets.player_bets.forEach((bet) => {
         if (!bet.status) {
            finishedEvents.find((event) => {
               if (event.id == bet.event_id) {
                  player.points = this.#countPoints(bet, event, player.points)
               }
            })
         }
      })
      await bets.save()
      await player.save()
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
