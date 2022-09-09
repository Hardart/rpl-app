const instance = require('./instance')

module.exports = {
   async all(pageNumber) {
      try {
         const { data } = await instance.get('', { params: { page: pageNumber } })
         return data
      } catch (error) {
         console.log(error)
      }
   },
}
