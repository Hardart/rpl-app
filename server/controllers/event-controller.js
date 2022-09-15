const eventService = require('../service/events-service')

class EventController {
   async loadAll(req, res, next) {
      try {
         await eventService.getAllEvents()
         return res.status(200).json({ status: 'ok' })
      } catch (error) {
         next(error)
      }
   }

   async loadStandingsInfo(req, res, next) {
      try {
         const standingsTable = await eventService.getStandingsData()
         return res.status(200).json(standingsTable)
      } catch (error) {
         next(error)
      }
   }

   async loadPastEvents(req, res, next) {
      try {
         const { limit } = req.query
         const events = await eventService.finished(limit)
         return res.status(200).json(events)
      } catch (error) {
         next(error)
      }
   }

   async loadFutureEvents(req, res, next) {
      try {
         const events = await eventService.notStarted()
         return res.status(200).json(events)
      } catch (error) {
         next(error)
      }
   }
}

module.exports = new EventController()
