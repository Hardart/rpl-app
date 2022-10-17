const eventsApi = require('../api/events-api')
const { Match } = require('../models')

class EventService {
  async updateAllEvents() {
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

  async getStandingsData() {
    const { data } = await eventsApi.standings()
    let standingsTable = []
    data[0].standings_rows.forEach((row) => {
      const teamData = {
        name: row.team.name_translations.ru,
        matches_total: row.fields.matches_total,
        wins_total: row.fields.wins_total,
        draws_total: row.fields.draws_total,
        losses_total: row.fields.losses_total,
        points_total: row.fields.points_total,
        position: row.position,
      }
      standingsTable.push(teamData)
    })

    return standingsTable
  }

  async loadAll() {
    try {
      const past = await this.finished()
      const next = await this.notStarted()
      return { past, next }
    } catch (error) {}
  }

  // set limit
  async finished(limit) {
    try {
      const events = await Match.find({ status: 'finished' }).sort({ round: 'desc' })
      let eventsCount = 0
      if (limit) eventsCount = events.length
      const roundGroup = []
      for (let roundIndex = 13; roundIndex > 0; roundIndex--) {
        const match = { round: 0, events: [] }
        match.round = roundIndex
        events.forEach((event) => {
          if (event.round == roundIndex) {
            match.events.push(this.#cleanEvent(event))
          }
        })
        roundGroup.push(match)
      }
      return { roundGroup, eventsCount }
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

  #cleanEvent({ id, home_team, away_team, home_team_logo, away_team_logo, home_score, away_score, winner_code, start_at, status, round }) {
    return { id, home_team, away_team, home_team_logo, away_team_logo, home_score, away_score, winner_code, start_at, status, round }
  }
}

module.exports = new EventService()
