const { User } = require('../models')
const bcrypt = require('bcryptjs')
const tokenService = require('./token-service')
const ErrorApi = require('../handlers/error-api')

class UserService {
   async registration(email, password, name, last_name) {
      const candidate = await User.findOne({ email })
      if (candidate) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} уже существует`)

      const hashPassword = await bcrypt.hash(password, 5)
      const { role } = await User.create({ email, password: hashPassword, name, last_name })
      if (!role) throw ErrorApi.RegistrationError()
      const token = tokenService.generateToken({ email, name, last_name, role })
      return token
   }

   async login(email, password) {
      const user = await User.findOne({ email })
      if (!user) throw ErrorApi.BadRequest(`Пользователь с адресом ${email} не найден`)

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) throw ErrorApi.BadRequest(`Неверный пароль`)

      const { name, last_name, role, bets, points } = user
      const token = tokenService.generateToken({ email, name, last_name, role, bets, points })
      return token
   }

   async getAll() {
      const players = await User.find({ role: ['player', 'admin'] })
      if (!players) return { message: 'еще никто не зарегистрировался' }
      return players
   }
}

module.exports = new UserService()
