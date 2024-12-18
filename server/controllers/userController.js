const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dtos');

class UserController {
    async searchUsers(req, res, next) {
        try {
            console.log("Received search request with query:", req.query);
            const { query } = req.query;
            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }

            const users = await User.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } }, 
                        { surname: { [Op.like]: `%${query}%` } },
                        { email: { [Op.like]: `%${query}%` } },
                        { patronymic: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            if (users.length === 0) {
                return res.status(404).json({ message: 'No users found matching the query' });
            }

            console.log("Search results:", users);
            return res.json(users);
        } catch (err) {
            console.error('Error during search:', err);
            return next(ApiError.internal(err.message));
        }
    }
    
    async getAll(req, res) {
        try {
            console.log("Received request to get all users");
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { surname: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { patronymic: { [Op.like]: `%${search}%` } }
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

            console.log("Users retrieved from database:", users.rows);

            return res.json({
                total: users.count,
                pages: Math.ceil(users.count / limit),
                data: users.rows
            });
        } catch (error) {
            console.error('Failed to retrieve users:', error);
            return res.status(500).json({ error: 'Failed to retrieve users' });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            console.log(`Received request to get user by ID: ${id}`);
            const user = await User.findByPk(id);
            if (!user) {
                console.log(`User not found with ID: ${id}`);
                return res.status(404).json({ error: 'User not found' });
            }
            console.log("User retrieved:", user);
            return res.json(user);
        } catch (error) {
            console.error('Failed to retrieve user:', error);
            return res.status(500).json({ error: 'Failed to retrieve user' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, surname, patronymic, email, phone_number, position, roles } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await user.update({ name, surname, patronymic, email, phone_number, position, roles });
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
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Ошибка валидации", errors.array()));
            }

            const { email, password, name, surname, patronymic, phone_number, position, roles } = req.body;
            console.log("Registration request body:", req.body);

            const userData = await userService.register(email, password, name, surname, patronymic, phone_number, position, roles);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error('Registration error:', e);
            next(ApiError.internal(e.message)); 
        }
    }     

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log("Login request data:", { email, password });

            const userData = await userService.login(email, password);
            console.log("User data after login:", userData);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error("Login error:", e);
            next(ApiError.internal(e.message)); 
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log("Received refresh token for logout:", refreshToken); 
            if (!refreshToken) {
                throw ApiError.badRequest("Refresh token not provided");
            }
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.error("Logout error:", e); 
            next(ApiError.internal(e.message)); 
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw ApiError.unauthorized("Refresh token not provided");
            }
            console.log("Received refresh token:", refreshToken); 
            const userData = await userService.refresh(refreshToken);
            console.log("User data after refresh:", userData); 
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (e) {
            console.error("Refresh error:", e); 
            next(ApiError.internal(e.message)); 
        }
    }
}

module.exports = new UserController();
