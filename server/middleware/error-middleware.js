const ErrorApi = require('../handlers/error-api')
module.exports = function (err, req, res, next) {
   if (err instanceof ErrorApi) return res.status(err.status).json({ message: err.message, errors: err.errors })
   // if (err.error) return res.status(200).json(err)
   return res.status(500).json({ message: 'Непредвиденная ошибка сервера' })
}
