require('dotenv').config()
const betService = require('../service/bet-service')
const playerService = require('../service/user-service')
const ErrorApi = require('../handlers/error-api')

class PlayerController {
   async registration(req, res, next) {
      try {
         const { email, password, name, last_name } = req.body
         const token = await playerService.registration(email, password, name, last_name)
         return res.status(200).json({ token })
      } catch (error) {
         next(error)
      }
   }

   async login(req, res, next) {
      try {
         const { email, password } = req.body
         const token = await playerService.login(email, password)
         return res.status(200).json(token)
      } catch (error) {
         next(error)
      }
   }

   async makeNewBet(req, res, next) {
      try {
         const bet = req.body
         const { email } = req.user
         const { token, bets } = await betService.makeNewBet(email, bet)
         return res.status(200).json({ token, bets })
      } catch (error) {
         next(error)
      }
   }

   async getMyBets(req, res, next) {
      try {
         const { email } = req.user
         const { bets, points } = await betService.getAllMyBets(email)

         return res.status(200).json({ bets, points })
      } catch (error) {
         next(error)
      }
   }

   async getAllBets(req, res, next) {
      try {
         const bets = await betService.getAllBets()
         return res.status(200).json(bets)
      } catch (error) {
         next(error)
      }
   }

   async deleteMyBets(req, res, next) {
      try {
         const { email } = req.user
         const token = await betService.deleteAllBets(email)
         return res.status(200).json(token)
      } catch (error) {
         next(error)
      }
   }

   async getPlayers(req, res, next) {
      try {
         const players = await playerService.getAll()
         res.status(200).json(players)
      } catch (error) {
         next(error)
      }
   }

   async check(req, res, next) {
      try {
         if (!req.user) return next(ErrorApi.UnathorizedError())
         return res.status(200).json(true)
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new PlayerController()
