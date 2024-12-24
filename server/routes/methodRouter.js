const Router = require('express');
const router = new Router();
const methodController = require('../controllers/methodController');

// Обратите внимание, что здесь используется /all для получения всех методичек
router.post('/create', methodController.create);
router.get('/all', methodController.getAll); 
router.put('/:id', methodController.update);
router.delete('/:id', methodController.deleteOne);
router.get('/search', methodController.search);
router.get('/download/:filename', methodController.downloadFile); 

module.exports = router;
