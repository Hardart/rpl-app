const Router = require('express').Router
const router = new Router()
const authCheck = require('../middleware/auth-middleware')
const superAdminCheck = require('../middleware/admin-middleware')
const eventController = require('../controllers/event-controller')
const playerController = require('../controllers/player-controller')

router.get('/load-all', authCheck, eventController.loaAllEvents)
router.get('/update', eventController.updateAll)
router.get('/standings', eventController.loadStandingsInfo)
router.get('/past', eventController.loadPastEvents)
router.get('/future', eventController.loadFutureEvents)
router.get('/check', authCheck, playerController.check)
router.post('/delete-user', authCheck, superAdminCheck, playerController.deleteUser)
router.post('/registration', playerController.registration)
router.post('/login', playerController.login)
router.post('/set-admin', authCheck, playerController.setRoleToAdmin)

router.post('/new-bet', authCheck, playerController.makeNewBet)
router.get('/my-bets', authCheck, playerController.getMyBets)
router.get('/all-bets', authCheck, superAdminCheck, playerController.getAllBets)
router.get('/all-players', playerController.getPlayers)
router.get('/delete-my-bets', authCheck, playerController.deleteMyBets)

module.exports = router
