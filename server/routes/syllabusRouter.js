const Router = require('express')
const router = new Router()
const syllabusController = require('../controllers/syllabusController')

router.post('/create', syllabusController.create)
router.get('/getAll', syllabusController.getAll)
router.get('/getOne/:id', syllabusController.getOne)
router.delete('/deleteOne/:id', syllabusController.deleteOne)

module.exports = router