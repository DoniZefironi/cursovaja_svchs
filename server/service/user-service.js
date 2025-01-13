const { User } = require("../models/models"); 
const tokenService = require("./token-service");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcryptjs");
const UserDto = require("../dtos/user-dtos");

class UserService {
    async register(email, password, name, surname, patronymic, phone_number, position, roles) {
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw new Error(`User with email ${email} already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = new User({ email, password: hashPassword, name, surname, patronymic, phone_number, position, roles });
        await user.save();

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.badRequest('User not found');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Incorrect password');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
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

        const user = await User.findById(userData.id);
        if (!user) {
            throw ApiError.unauthorized("User not found");
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
