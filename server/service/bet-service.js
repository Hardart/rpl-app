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
      let myBets = []
      if (player.bets.length > 0) {
         myBets = [...player.bets, ...newBets]
         await this.#addBetToPlayerBets(email, myBets)
      } else {
         myBets = await this.#newBet(email, newBets)
      }
      const { name, last_name, role, bets, points } = await this.#addBetIDToPlayerInfo(player.data, newBets)

      const token = tokenService.generateToken({ email, name, last_name, role, bets, points })
      return { token, bets: myBets }
   }

   async getAllMyBets(email) {
      const player = await this.#getPlayerInfo(email)
      if (player.bets) return { bets: [], points: 0 }
      const finishedEvents = await eventsService.finished()
      this.#updateBetStatus(player.bets, player.data, finishedEvents)

      return { bets: player.bets, points: player.data.points }
   }

   async deleteAllBets(email) {
      await Bet.findOneAndRemove({ player_email: email })
      const player = await User.findOneAndUpdate({ email }, { bets: [], points: 0 }, { new: true })
      const { name, last_name, role, bets, points } = player
      const token = tokenService.generateToken({ email, name, last_name, role, bets, points })
      return token
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

   async #addBetToPlayerBets(email, bets) {
      const res = await Bet.findOneAndUpdate({ player_email: email }, { player_bets: bets }, { new: true })
      return res.player_bets
   }

   async #addBetIDToPlayerInfo(player, betArray) {
      if (betArray.length == 0) {
         player.bets = []
      } else {
         betArray.forEach((bet) => {
            player.bets.push(bet.event_id)
         })
      }

      await User.findOneAndUpdate({ email: player.email }, { bets: player.bets })
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
