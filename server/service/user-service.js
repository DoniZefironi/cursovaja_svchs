const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const UserDto = require('../dtos/user-dtos');
const tokenService = require('./token-service');

class UserService {
    async registration(name, surname, phone_number, email, password, roles) {
        try {
            console.log('Received parameters:', { name, surname, phone_number, email, password, roles });

            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            console.log('Checking for existing user with email:', email);
            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                console.log('User with this email already exists');
                throw new Error('User with this email already exists');
            }

            const hashPassword = await bcrypt.hash(password, 3);
            console.log('Hashed password:', hashPassword);

            const user = await User.create({
                name,
                surname,
                phone_number,
                email,
                password: hashPassword,
                roles
            });

            console.log('User created:', user);

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            console.log('Registration successful:', { tokens, user: userDto });

            return {
                ...tokens,
                user: userDto
            }
        } catch (error) {
            console.error('Error in registration:', error);
            throw error;
        }
    }
}

module.exports = new UserService();

