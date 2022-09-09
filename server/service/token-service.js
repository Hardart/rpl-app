const jwt = require('jsonwebtoken')

class TokenService {
   generateToken(payload) {
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '30d' })
      return accessToken
   }

   validateAccessToken(token) {
      try {
         const userData = jwt.verify(token, process.env.ACCESS_TOKEN)
         return userData
      } catch (error) {
         return null
      }
   }
}

module.exports = new TokenService()
