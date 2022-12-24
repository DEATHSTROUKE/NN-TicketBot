const Router = require('express')
const router = new Router()
const ordersRouter = require('./ordersRouter.js')
const eventsRouter = require('./eventsRouter.js')
const ApiController = require('../controllers/ApiController')
const IsAuthorizedMiddleware = require('../middleware/IsAuthorizedMiddleware')

router.get('/get_all_category', ApiController.getAllCategory)
router.get('/get_all_info', ApiController.getAllInfo)
router.get('/get_paid_tickets_by_user_id', (req, res, next) => ApiController.getTicketsByUserId(req, res, next, true))
router.get('/get_unpaid_tickets_by_user_id', (req, res, next) => ApiController.getTicketsByUserId(req, res, next, false))
router.post('/add_new_order_by_user_id', IsAuthorizedMiddleware, ApiController.addNewOrderByUserId)
router.post('/set_order_as_paid_by_user_id', IsAuthorizedMiddleware, ApiController.setOrderAsPaidByUserId)
router.post('/set_order_as_closed_by_user_id', IsAuthorizedMiddleware, ApiController.setOrderAsClosedByUserId)

router.use('/orders', ordersRouter)
router.use('/events', eventsRouter)


module.exports = router