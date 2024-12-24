const Router = require('express');
const router = new Router();
const specialityMethodsController = require('../controllers/speciality_methodsController');

// Обратите внимание, что здесь используется /all для получения всех методичек
router.post('/create', specialityMethodsController.create);
router.get('/all', specialityMethodsController.getAll);
router.get('/:id', specialityMethodsController.getOne); // Путь для получения методички по ID
router.put('/:id', specialityMethodsController.updateOne);
router.delete('/:id', specialityMethodsController.deleteOne);
router.get('/search', specialityMethodsController.search);

module.exports = router;
