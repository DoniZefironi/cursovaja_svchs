const express = require('express');
const router = express.Router();
const form_studiesController = require('../controllers/form_studiesController');

router.post('/create', form_studiesController.create);
router.get('/all', form_studiesController.getAll);
router.get('/one', form_studiesController.getOne);
router.put('/:id', form_studiesController.updateOne);
router.delete('/:id', form_studiesController.deleteOne);
router.get('/search', form_studiesController.search);

module.exports = router;