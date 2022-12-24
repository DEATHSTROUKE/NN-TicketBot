const Router = require('express')
const router = new Router()
const EventsController = require('../controllers/EventsController')
const IsAuthorizedMiddleware = require('../middleware/IsAuthorizedMiddleware')

router.get('/', EventsController.getAll)
router.get('/:id', EventsController.getOne)
router.post('/', IsAuthorizedMiddleware, EventsController.createObj)
router.put('/', IsAuthorizedMiddleware, EventsController.updateObj)
router.delete('/:id', IsAuthorizedMiddleware, EventsController.deleteObj)

module.exports = router