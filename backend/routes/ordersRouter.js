const Router = require('express')
const router = new Router()
const OrdersController = require('../controllers/OrdersController')
const IsAuthorizedMiddleware = require('../middleware/IsAuthorizedMiddleware')

router.get('/', OrdersController.getAll)
router.get('/:id', OrdersController.getOne)
router.post('/', IsAuthorizedMiddleware, OrdersController.createObj)
router.put('/', IsAuthorizedMiddleware, OrdersController.updateObj)
router.delete('/:id', IsAuthorizedMiddleware, OrdersController.deleteObj)


module.exports = router