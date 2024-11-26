const Router = require('express')
const router = new Router()
const subjectController = require('../controllers/subjectController')

router.post('/', subjectController.create)
router.get('/', subjectController.getAll) 
router.get('/getOne/:id', subjectController.getOne)
router.delete('/deleteOne/:id', subjectController.deleteOne)

module.exports = router