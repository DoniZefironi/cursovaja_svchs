const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models'); 
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

            const users = await User.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { surname: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { patronymic: { $regex: query, $options: 'i' } }
                ]
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
    
    async getAll(req, res, next) {
        try {
            console.log("Received request to get all users");
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};
    
            if (search) {
                where.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { surname: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { patronymic: { $regex: search, $options: 'i' } }
                ];
            }
    
            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }
    
            const users = await User.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 });
    
            const total = await User.countDocuments(where);
    
            console.log("Users retrieved from database:", users);
    
            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: users
            });
        } catch (error) {
            console.error('Failed to retrieve users:', error);
            return next(ApiError.internal('Failed to retrieve users'));
        }
    }
    

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            console.log(`Received request to get user by ID: ${id}`);
            const user = await User.findById(id);
            if (!user) {
                console.log(`User not found with ID: ${id}`);
                return res.status(404).json({ error: 'User not found' });
            }
            console.log("User retrieved:", user);
            return res.json(user);
        } catch (error) {
            console.error('Failed to retrieve user:', error);
            return next(ApiError.internal('Failed to retrieve user'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, surname, patronymic, email, phone_number, position, roles } = req.body;

            const user = await User.findById(id);
            if (!user) {
                return next(ApiError.notFound('User not found'));
            }

            user.name = name;
            user.surname = surname;
            user.patronymic = patronymic;
            user.email = email;
            user.phone_number = phone_number;
            user.position = position;
            user.roles = roles;
            await user.save();

            return res.json({ message: 'User updated successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to update user'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) {
                return next(ApiError.notFound('User not found'));
            }
            await user.deleteOne();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to delete user'));
        }
    }

    async checkExistence(req, res, next) {
        try {
            const { email } = req.query;
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }
            console.log(`Checking existence for email: ${email}`);
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({ message: 'User exists' });
        } catch (error) {
            console.error('Error checking user existence:', error);
            return next(ApiError.internal('Failed to check user existence'));
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
