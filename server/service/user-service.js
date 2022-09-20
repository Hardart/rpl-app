const { User, Bet } = require('../models')
const bcrypt = require('bcryptjs')
const tokenService = require('./token-service')
const ErrorApi = require('../handlers/error-api')

class UserService {
   async registration(email, password, name, last_name) {
      const candidate = await User.findOne({ email })
      if (candidate) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} уже существует`)

      const hashPassword = await bcrypt.hash(password, 5)
      const { role, full_name } = await User.create({ email, password: hashPassword, name, last_name })
      if (!role) throw ErrorApi.RegistrationError()
      const token = tokenService.generateToken({ email, name, last_name, role, full_name })
      return token
   }

   async login(email, password) {
      const user = await User.findOne({ email })
      if (!user) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} не найден`)

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) throw ErrorApi.BadRequest(`Неверный пароль`)

      const { name, last_name, role, bets, points, full_name } = user
      const token = tokenService.generateToken({ email, name, last_name, role, bets, points, full_name })
      return token
   }

   async getAll() {
      const playersSchema = await User.find()
      if (!playersSchema) return { message: 'еще никто не зарегистрировался' }
      let players = []
      playersSchema.forEach(({ full_name, email, points, bets, role }) => {
         players.push({ full_name, email, points, bets, role })
      })
      return players
   }

   async deleteUser(email) {
      const deletedUser = await User.findOneAndDelete({ email })
      const bets = await Bet.find({ player_email: email })
      if (!bets) return deletedUser
      const deletedBets = await Bet.deleteOne({ player_email: email })
      if (deletedBets && deletedUser) return deletedUser
      return false
   }

   async newAdmin(email) {
      await User.findOneAndUpdate({ role: 'admin' }, { role: 'player' })
      await User.findOneAndUpdate({ email }, { role: 'admin' })
      return true
   }
}

module.exports = new UserService()
