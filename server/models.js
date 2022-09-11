const { Schema, model } = require('mongoose')

const Match = Schema({
   id: Number,
   home_team: String,
   away_team: String,
   home_team_logo: String,
   away_team_logo: String,
   home_score: Number,
   away_score: Number,
   winner_code: Number,
   start_at: Number,
   status: String,
   round: Number,
})

const PlayerBet = new Schema({
   event_id: Number,
   home_score: Number,
   away_score: Number,
   winner_code: Number,
   bet_code: Number,
   status: {
      type: Boolean,
      default: false,
   },
})

const Bet = Schema({
   player_email: String,
   player_bets: [PlayerBet],
})

const User = Schema({
   email: String,
   password: String,
   last_name: String,
   name: String,
   bets: {
      type: Array,
      default: [],
   },
   points: {
      type: Number,
      default: 0,
   },
   role: {
      type: String,
      default: 'player',
   },
})

module.exports = {
   Match: model('Match', Match),
   User: model('User', User),
   Bet: model('Bet', Bet),
}
