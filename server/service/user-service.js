const { User } = require("../models/models");
const tokenService = require("./token-service");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require("../dtos/user-dtos");

class UserService {
    async register(email, password, name, surname, phone_number, roles) {
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({ email, password: hashPassword, name, surname, phone_number, roles });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto, roles });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

        async login(email, password) {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw ApiError.badRequest('User not found');
            }
    
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError.badRequest('Incorrect password');
            }
    
            const userDto = new UserDto(user); // dto возвращает id, email, roles
            const tokens = tokenService.generateTokens({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
            return {
                ...tokens,
                user: userDto
            };
        }
    

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorized("Refresh token not provided");
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            throw ApiError.unauthorized("Invalid refresh token");
        }
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!tokenFromDb) {
            throw ApiError.unauthorized("Refresh token not found in database");
        }

        const user = await User.findByPk(userData.id);
        if (!user) {
            throw ApiError.unauthorized("User not found");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto, roles: user.roles });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
