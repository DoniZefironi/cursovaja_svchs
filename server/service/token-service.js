const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models/models'); 

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        try {
            const tokenData = await RefreshToken.findOne({ id_user: userId });
            if (tokenData) {
                tokenData.refresh_token = refreshToken;
                await tokenData.save();
            } else {
                await RefreshToken.create({ id_user: userId, refresh_token: refreshToken });
            }
        } catch (error) {
            console.error("Error saving token:", error);
        }
    }

    async removeToken(refreshToken) {
        try {
            const tokenData = await RefreshToken.findOneAndDelete({ refresh_token: refreshToken });
            console.log("Token removed from database:", tokenData); 
            return tokenData;
        } catch (e) {
            console.error("Error removing token from database:", e);
            throw e;
        }
    }

    async findToken(refreshToken) {
        try {
            return await RefreshToken.findOne({ refresh_token: refreshToken });
        } catch (error) {
            console.error("Error finding token:", error);
            return null;
        }
    }
}

module.exports = new TokenService();
