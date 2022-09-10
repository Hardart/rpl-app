const Router = require('express').Router
const router = new Router()
const authCheck = require('../middleware/auth-middleware')
const superAdminCheck = require('../middleware/admin-middleware')
const eventController = require('../controllers/event-controller')
const playerController = require('../controllers/player-controller')

router.get('/all', eventController.loadAll)
router.get('/mongo', eventController.loadFromMongo)
router.get('/past', eventController.loadPastEvents)
router.get('/future', eventController.loadFutureEvents)
router.get('/check', authCheck, playerController.check)
router.post('/registration', playerController.registration)
router.post('/login', playerController.login)

router.post('/new-bet', authCheck, playerController.makeNewBet)
router.get('/my-bets', authCheck, playerController.getMyBets)
router.get('/all-bets', authCheck, superAdminCheck, playerController.getAllBets)
router.get('/all-players', playerController.getPlayers)
router.get('/delete-my-bets', authCheck, playerController.deleteMyBets)

module.exports = router
