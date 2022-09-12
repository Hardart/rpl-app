const eventsApi = require('../api/events-api')
const { Match } = require('../models')

class EventService {
   async getAllEvents() {
      try {
         await Match.collection.drop()
         let i = 1
         do {
            const { data } = await eventsApi.all(i)

            for (let j = 0; j < data.length; j++) {
               const event = data[j]
               const match = this.#newEvent(event)
               await match.save()
            }

            i++
         } while (i < 4)
      } catch (error) {
         console.log(error)
      }
   }

   async loadFromMongo() {
      try {
         const next = await this.notStarted()
         const past = await this.finished()
         return { next, past }
      } catch (error) {}
   }

   // set limit
   async finished(limit) {
      try {
         const events = await Match.find({ status: 'finished' }).sort({ round: 'desc' })
         return events
      } catch (error) {}
   }

   async notStarted() {
      try {
         const { round } = await Match.findOne({ status: 'notstarted' }).sort({ round: 'asc' })
         const events = await Match.find({ round: round }).sort({ round: 'asc' })
         return events
      } catch (error) {}
   }

   #newEvent(event) {
      return new Match({
         id: event.id,
         home_team: event.home_team.name_translations.ru,
         away_team: event.away_team.name_translations.ru,
         home_team_logo: event.home_team.logo,
         away_team_logo: event.away_team.logo,
         home_score: event.home_score?.current,
         away_score: event.away_score?.current,
         winner_code: event.winner_code,
         start_at: new Date(event.start_at).valueOf(),
         status: event.status,
         round: event.round_number,
      })
   }
}

module.exports = new EventService()
