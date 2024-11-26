const Router = require('express')
const router = new Router()
const subjectController = require('../controllers/subjectController')

router.post('/create', subjectController.create)
router.get('/getAll', subjectController.getAll) 
router.get('/getOne/:id', subjectController.getOne)
router.delete('/deleteOne/:id', subjectController.deleteOne)

module.exports = router