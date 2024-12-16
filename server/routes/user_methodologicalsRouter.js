const express = require('express');
const router = express.Router();
const user_methodologicalsController = require('../controllers/user_methodologicalsController');

router.post('/create', user_methodologicalsController.create);
router.get('/all', user_methodologicalsController.getAll);
router.get('/one', user_methodologicalsController.getOne);
router.put('/:id', user_methodologicalsController.updateOne);
router.delete('/:id', user_methodologicalsController.deleteOne);
router.get('/search', user_methodologicalsController.search);

module.exports = router;
