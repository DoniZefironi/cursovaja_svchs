const Router = require('express')
const router = new Router()
const specialityController = require('../controllers/specialityController')

router.post('/create', specialityController.create);
router.get('/all', specialityController.getAll);
router.get('/one', specialityController.getOne);
router.put('/:id', specialityController.update);
router.delete('/:id', specialityController.deleteOne);
router.get('/search', specialityController.search);

module.exports = router