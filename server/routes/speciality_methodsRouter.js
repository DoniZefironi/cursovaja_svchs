const Router = require('express');
const router = new Router();
const specialityMethodsController = require('../controllers/speciality_methodsController');

router.post('/create', specialityMethodsController.create);
router.get('/all', specialityMethodsController.getAll);
router.get('/:id', specialityMethodsController.getOne); 
router.put('/:id', specialityMethodsController.updateOne);
router.delete('/:id', specialityMethodsController.deleteOne);
router.get('/search', specialityMethodsController.search);

module.exports = router;
