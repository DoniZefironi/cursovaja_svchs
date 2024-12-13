const Router = require('express');
const router = new Router();
const syllabusController = require('../controllers/syllabusController');

router.post('/create', syllabusController.create);
router.get('/all', syllabusController.getAll);
// router.get('/one', syllabusController.getOne);
router.put('/:id', syllabusController.updateOne);
router.delete('/:id', syllabusController.deleteOne);
router.get('/search', syllabusController.search);
router.get('/download/:filename', syllabusController.downloadFile); 

module.exports = router;
