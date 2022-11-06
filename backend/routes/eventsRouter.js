const Router = require('express')
const router = new Router()
const EventsController = require('../controllers/EventsController')

router.get('/', EventsController.getAll)
router.get('/:id', EventsController.getOne)
router.post('/', EventsController.createObj)
router.put('/', EventsController.updateObj)
router.delete('/:id', EventsController.deleteObj)

module.exports = router