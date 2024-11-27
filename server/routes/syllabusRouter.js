const express = require('express');
const router = express.Router();
const syllabusController = require('../controllers/syllabusController');

router.post('/create', syllabusController.create);
router.get('/all', syllabusController.getAll);
router.get('/one', syllabusController.getOne);
router.put('/:id', syllabusController.updateOne);
router.delete('/:id', syllabusController.deleteOne);
router.get('/search', syllabusController.search);

module.exports = router;