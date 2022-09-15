const instance = require('./instance')

module.exports = {
   async all(pageNumber) {
      try {
         const { data } = await instance.get('/events', { params: { page: pageNumber } })
         return data
      } catch (error) {
         console.log(error)
      }
   },
   async standings(pageNumber) {
      try {
         const { data } = await instance.get('/standings-tables')
         return data
      } catch (error) {
         console.log(error)
      }
   },
}
