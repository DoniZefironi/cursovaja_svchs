const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const  {body} = require("express-validator");
const authMiddleware = require('../middleware/auth-middleware');


router.get('/all',userController.getAll);
// router.get('/:id',userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/exists', userController.checkExistence);
router.post('/registration',body("email").isEmail(),body("password").isLength({min:3,max:32}),userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/search', userController.searchUsers)

module.exports = router;