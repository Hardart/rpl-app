const ErrorApi = require('../handlers/error-api')

module.exports = function (req, res, next) {
   const { role } = req.user

   if (role !== 'super-admin') return next(ErrorApi.AccessDenied())

   next()
}
