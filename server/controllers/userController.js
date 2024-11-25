const {User} = require('../models/models')
const ApiError = require('../error/ApiError');

class UserController {
    async create(req, res) {
        const { name, surname, phone_number, email, password, roles } = req.body;
        const user = await User.create({name, surname, phone_number, email, password, roles});
        return res.json(user);
    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const {id} = req.query
        if (!id){
            return next(ApiError.bodRequest('Не задан ID'))
        }
        res.json(id);
    }

    async getall(req, res){
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()