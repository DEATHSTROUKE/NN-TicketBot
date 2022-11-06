const Router = require('express')
const router = new Router()
const OrdersController = require('../controllers/OrdersController')


router.get('/', OrdersController.getAll)
router.get('/:id', OrdersController.getOne)
router.post('/', OrdersController.createObj)
router.put('/', OrdersController.updateObj)
router.delete('/:id', OrdersController.deleteObj)


module.exports = router