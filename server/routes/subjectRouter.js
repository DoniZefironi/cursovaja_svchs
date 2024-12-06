const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.post('/create', subjectController.create);
router.get('/all', subjectController.getAll);
router.get('/one', subjectController.getOne);
router.put('/:id', subjectController.updateOne);
router.delete('/:id', subjectController.deleteOne);
router.get('/search', subjectController.search); // Проверьте, что этот маршрут существует

module.exports = router;
