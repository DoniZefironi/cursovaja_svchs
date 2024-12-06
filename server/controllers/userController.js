const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const { Op } = require('sequelize');
const {validationResult } = require('express-validator');
const userService = require('../service/user-service');
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dtos");

class UserController {

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
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            console.log(`Checking existence for email: ${email}`);
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({ message: 'User exists' });
        } catch (error) {
            console.error('Error checking user existence:', error);
            return res.status(500).json({ error: 'Failed to check user existence' });
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации",errors.array()));
            }
            const { email, password, name, surname, phone_number, roles } = req.body;
            const userData = await userService.register(email, password, name, surname, phone_number, roles);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));  // Передаем ошибку в обработчик ошибок
        }
    }

    async login(req, res, next) {
        try {
            const { email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message)); // Передаем ошибку в обработчик
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await  userService.logout(refreshToken)
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message)); // Передаем ошибку в обработчик
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await  userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData)
        } catch (e) {
            console.error(e);
            next(ApiError.Internal(e.message));
        }
    }
}

module.exports = new UserController();