const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.post('/create', userController.create);
router.get('/all', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/exists', userController.checkExistence);
// router.post('/registration');
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

module.exports = router;