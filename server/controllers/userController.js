const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User, Subject } = require('../models/models');
const { Op } = require('sequelize');

class UserController {
    async create(req, res) {
        try {
            const { name, surname, phone_number, email, password, roles } = req.body;
            const user = await User.create({ name, surname, phone_number, email, password, roles });
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create user' });
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { surname: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const users = await User.findAndCountAll({
                where,
                limit,
                offset,
                order: [[sortBy, order]]
            });

            return res.json({
                total: users.count,
                pages: Math.ceil(users.count / limit),
                data: users.rows
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve users' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve user' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, surname, phone_number, email, password, roles } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.update({ name, surname, phone_number, email, password, roles });
            return res.json({ message: 'User updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
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

    async checkExistence(req, res) {
        try {
            const { email } = req.query;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({ message: 'User exists' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to check user existence' });
        }
    }
}

module.exports = new UserController();