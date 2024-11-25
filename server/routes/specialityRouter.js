const Router = require('express')
const router = new Router()
const specialityController = require('../controllers/specialityController')

router.post('/create', specialityController.create)
router.get('/getAll', specialityController.getAll)
router.get('/getOne/:id', specialityController.getOne)
router.delete('/deleteOne/:id', specialityController.deleteOne)

module.exports = router