const Router = require('express');
const router = new Router();
const methodController = require('../controllers/methodController');

router.post('/create', methodController.create);
router.get('/all', methodController.getAll);
// router.get('/one', methodController.getOne);
router.put('/:id', methodController.update);
router.delete('/:id', methodController.deleteOne);
router.get('/search', methodController.search);
router.get('/download/:filename', methodController.downloadFile); 

module.exports = router;
