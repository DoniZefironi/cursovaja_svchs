const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.post('/create', userController.create);
router.post('/login', userController.login);
router.get('/check', userController.check);
router.get('/getall', userController.getall);
router.delete('/delete/:id', userController.delete);

module.exports = router;