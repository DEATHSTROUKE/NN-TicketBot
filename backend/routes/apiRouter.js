const Router = require('express')
const router = new Router()
const ordersRouter = require('./ordersRouter.js')
const eventsRouter = require('./eventsRouter.js')
const ApiController = require('../controllers/ApiController')

router.get('/get_all_category', ApiController.getAllCategory)
router.get('/get_all_info', ApiController.getAllInfo)
router.get('/get_paid_tickets_by_user_id', (req, res, next) => ApiController.getTicketsByUserId(req, res, next, true))
router.get('/get_unpaid_tickets_by_user_id', (req, res, next) => ApiController.getTicketsByUserId(req, res, next, false))
router.post('/add_new_order_by_user_id', ApiController.addNewOrderByUserId)
router.post('/set_order_as_paid_by_user_id', ApiController.setOrderAsPaidByUserId)
router.post('/set_order_as_closed_by_user_id', ApiController.setOrderAsClosedByUserId)

router.use('/orders', ordersRouter)
router.use('/events', eventsRouter)


module.exports = router