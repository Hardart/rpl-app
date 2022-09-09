const Markup = require('node-vk-bot-api/lib/markup')
const { Player, Match, Bet } = require('./models')
const { Team, dates } = require('./helpers')

async function savePlayer(vkId = Number(), name = String(), lastname = String()) {
   const player = new Player({
      vk_id: vkId,
      last_name: lastname,
      name: name,
      points: 0,
      bets: {},
   })
   try {
      await player.save()
   } catch (e) {
      console.log(e)
   }
}

function customKeybord(games, btnText = 'Отменить', payload = 'cancel') {
   buttons = []
   // let summ = games.length
   let columns = 3

   for (let i = 0; i < 10; i++) {
      arrayOfButtons = []
      for (let j = i * columns; j < (i + 1) * columns; j++) {
         if (games[j]) {
            arrayOfButtons.push(games[j])
         }
      }
      if (arrayOfButtons[0]) {
         buttons.push(arrayOfButtons)
      }
   }
   let cancel = Markup.button(btnText, 'negative', { value: payload })
   buttons.push([cancel])
   return Markup.keyboard(buttons).oneTime()
}

function sendRequest(method, url, body = null, headers = Object) {
   method == 'get' ? (body = null) : body
   return fetch(url, {
      method: method,
      body: body ? JSON.stringify(body) : null,
      headers: headers,
   }).then((obj) => obj.json())
}

function addZero(i) {
   if (i < 10) {
      i = '0' + i
   }
   return i
}

function wordEndings(value = Number(), words = Array()) {
   let num = Math.abs(value) % 100
   let num1 = num % 10
   if (num > 10 && num < 20) {
      return words[2]
   }
   if (num1 > 1 && num1 < 5) {
      return words[1]
   }
   if (num1 == 1) {
      return words[0]
   }
   return words[2]
}

function newKeybord(users = Array(), btnText = 'Отменить', payload = 'cancel') {
   buttons = []
   let summ = users.length
   let columns = 5
   if (summ % 4 == 0 && summ < 15) {
      columns = 4
   } else if (summ % 3 == 0 && summ < 15) {
      columns = 3
   }

   for (let i = 0; i < 10; i++) {
      arrayOfButtons = []
      for (let j = i * columns; j < (i + 1) * columns; j++) {
         if (users[j]) {
            arrayOfButtons.push(users[j])
         }
      }
      if (arrayOfButtons[0]) {
         buttons.push(arrayOfButtons)
      }
   }
   let cancel = Markup.button(btnText, 'negative', { value: payload })
   buttons.push([cancel])

   return Markup.keyboard(buttons).oneTime()
}

function getWinnerCode(score = String()) {
   let home = score[0]
   let away = score[2]

   if (home > away) {
      return 1
   }
   if (home < away) {
      return 2
   }
   return 3
}

async function buttonsAndArray(collection, vkId, gameStatus = String(), params = { round: 1 }) {
   const matches = await collection.find({ status: gameStatus }).sort(params)
   let matchArray = []
   let matchButtons = []
   const nextRound = matches[0].round
   let matchList = `Рануд ${nextRound}\n===============`
   let j = 1
   console.log(nextRound)
   for (let i = 0; i < matches.length; i++) {
      if (matches[i].round == nextRound) {
         let game = matches[i]
         const match = await Match.findOne({ id: game.id })
         const player = await Player.findOne({ vk_id: vkId })
         const date = `${match.date}T${match.start_at}`
         const newDate = new Date(date)
         if (!player.bets[nextRound] || !player.bets[nextRound][game.id]) {
            if (dates.compare(new Date(), newDate) == -1) {
               matchArray.push(game)
               matchList += `\n\n${j}. ${game.home_team} - ${game.away_team}`
               matchButtons.push(Markup.button(j, 'primary', game.id))
               j++
            }
         }
      }
   }

   matchList += `\n\n===============`
   if (!matchArray[0]) {
      matchList = nextRound
   }

   return { btns: matchButtons, list: matchList, array: matchArray }
}

async function bet(collection, vkId, round, gameId, betModel) {
   let player = await collection.findOne({ vk_id: vkId })
   let betsObj = player.bets
   if (betsObj[round]) {
      betsObj[round][gameId] = betModel
   } else {
      betsObj[round] = {}
      betsObj[round][gameId] = betModel
   }

   await Player.updateOne({ vk_id: vkId }, { bets: betsObj })
}

async function showBetResults(vkId = Number()) {
   const matches = await Match.find({ status: 'finished' }).sort({ round: -1 })
   const player = await Player.findOne({ vk_id: vkId })
   const prevRound = matches[0].round
   let matchList = `Рануд ${prevRound}\n===============`
   for (i in matches) {
      if (matches[i].round == prevRound) {
         let game = matches[i]
         if (player.bets[prevRound]) {
            for (j in player.bets[prevRound]) {
               let round = player.bets[prevRound][j]
               if (game.id == round.id) {
                  matchList += `\n\n${Team[game.home_team]} - ${Team[game.away_team]}`
                  matchList += `\nСчёт игры: ${game.home_score}-${game.away_score}`
                  matchList += `\nМоя ставка: ${round.my_score}`
               }
            }
         }
      }
   }
   return matchList
}

async function scoreTable(guessTheScore = Number(), guessTheWinner = Number()) {
   const matches = await Match.find({ status: 'finished' }).sort({ round: -1 })
   let lastRound = matches[0].round
   const players = await Player.find().sort({ points: -1 })

   players.forEach(async (player) => {
      try {
         if (player.bets[lastRound]) {
            const keysArray = Object.keys(player.bets[lastRound])

            keysArray.forEach(async (key) => {
               let match = await Match.findOne({ id: key })
               let bets = player.bets
               let myBet = bets[lastRound][key]

               switch (true) {
                  case match.home_score == myBet.my_home_score && match.away_score == myBet.my_away_score:
                     if (!myBet.bet_status) {
                        myBet.bet_status = true
                        await Player.updateOne({ vk_id: player.vk_id }, { points: player.points + guessTheScore, bets: bets })
                     }
                     break
                  case match.winner_code == myBet.winner_code:
                     if (!myBet.bet_status) {
                        myBet.bet_status = true
                        await Player.updateOne({ vk_id: player.vk_id }, { points: player.points + guessTheWinner, bets: bets })
                     }
                     break
               }
            })
         }
      } catch (err) {
         console.log(err)
      }
   })
}

function addAllGames() {
   let headers = {
      'x-rapidapi-host': 'sportscore1.p.rapidapi.com',
      'x-rapidapi-key': '634f40ab1dmshc056a9419dd46d7p19b876jsn3a80214a1344',
   }
   let i = 1
   Match.collection.drop()
   do {
      let url = 'https://sportscore1.p.rapidapi.com/seasons/18936/events?page=' + i
      sendRequest('get', url, null, headers).then(async (res) => {
         for (let i = 0; i < res.data.length; i++) {
            let game = res.data[i]
            let dateOfMatch = new Date(Date.parse(res.data[i].start_at))

            const gameHour = dateOfMatch.getHours() + 3
            const gameMinutes = addZero(dateOfMatch.getMinutes())
            const gameDay = addZero(dateOfMatch.getDate())
            const gameMonth = addZero(dateOfMatch.getMonth() + 1)
            const gameYear = dateOfMatch.getFullYear()
            const homeTeam = game.home_team.name_translations.ru
            const awayTeam = game.away_team.name_translations.ru
            const gameId = game.id
            const seasonRound = game.round_number
            const status = game.status
            let homeScore = '-'
            let awayScore = '-'
            let winner = 0

            if (status == `finished`) {
               homeScore = game.home_score.current
               awayScore = game.away_score.current
               winner = game.winner_code
            }

            const match = new Match({
               id: gameId,
               home_team: homeTeam,
               away_team: awayTeam,
               home_score: homeScore,
               away_score: awayScore,
               winner_code: winner,
               date: `${gameYear}-${gameMonth}-${gameDay}`,
               start_at: `${gameHour}:${gameMinutes}:00`,
               status: status,
               round: seasonRound,
            })

            await match.save()
         }
      })
      i++
   } while (i < 4)
}

async function roundResult() {
   const matches = await Match.find({ status: 'finished' }).sort({ round: -1 })
   const lastRond = matches[0].round
   let resultString = `Результаты ${lastRond} раунда\n`
   matches.forEach((match) => {
      if (match.round == lastRond) {
         resultString += `\n${match.home_team} - ${match.away_team}`
         resultString += `\n${match.home_score} - ${match.away_score}`
         resultString += `\n-------------------------------`
      }
   })
   return resultString
}

module.exports = {
   customKeybord: customKeybord,
   sendRequest: sendRequest,
   addZero: addZero,
   wordEndings: wordEndings,
   buttonsAndArray: buttonsAndArray,
   bet: bet,
   savePlayer: savePlayer,
   showBetResults: showBetResults,
   scoreTable: scoreTable,
   addAllGames: addAllGames,
   roundResult: roundResult,
   getWinnerCode: getWinnerCode,
   newKeybord: newKeybord,
}
