const Router = require('express')
const router = new Router()
const methodController = require('../controllers/methodController')

router.post('/create', methodController.create)
router.get('/getAll', methodController.getAll)
router.get('/getOne/:id', methodController.getOne)
router.delete('/deleteOne/:id', methodController.deleteOne)

module.exports = router