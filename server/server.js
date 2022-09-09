require('dotenv/config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const errorMiddleware = require('./middleware/error-middleware')
const router = require('./router/index')
const PORT = process.env.PORT || 80
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', router)
app.use(errorMiddleware)
async function start() {
   try {
      await mongoose.connect(process.env.DB_RPL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('БД подключена')
      app.listen(PORT, () => {
         console.log(`Сервер запустился. Порт: ${PORT}`)
      })
   } catch (e) {
      console.log(e)
   }
}

start()

// addAllGames()
// setInterval(() => {
//    addAllGames()
//    console.log('Matches INFO has been updated')
// }, 3600 * 6 * 1000)
