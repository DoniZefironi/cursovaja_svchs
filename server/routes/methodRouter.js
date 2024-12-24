const Router = require('express');
const router = new Router();
const methodController = require('../controllers/methodController');

// Обратите внимание, что здесь используется /all для получения всех методичек
router.post('/create', methodController.create);
router.get('/all', methodController.getAll); 
router.get('/one/:id', methodController.getOne); // Добавлен новый путь для получения методички по ID
router.put('/:id', methodController.update);
router.delete('/:id', methodController.deleteOne);
router.get('/search', methodController.search);
router.get('/download/:filename', methodController.downloadFile); 

module.exports = router;
