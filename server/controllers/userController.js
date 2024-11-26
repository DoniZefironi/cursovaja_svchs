const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const {User, Subject} = require('../models/models')

class UserController {
    async create(req, res) {
        const { name, surname, phone_number, email, password, roles } = req.body;
        const user = await User.create({name, surname, phone_number, email, password, roles});
        return res.json(user);
    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
                include: [
                    { model: PhoneNumber, as: 'phone_number' },
                    { model: Email, as: 'email' },
                    { model: Roles, as: 'roles' }
                ]
            },
        )
        return res.json(user)
    }

    async getall(req, res){
        const users = await User.findAll()
        return res.json(users)
    }

    async delete(req, res) {
        const { id } = req.params;
        
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            await user.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}

module.exports = new UserController()