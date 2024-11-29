const jwt = require('jsonwebtoken');
const Refresh_Token = require('../models/models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(id_user, refresh_token){
        const tokenData = await Refresh_Token.findOne({user: id_user})
        if (tokenData) {
            tokenData.refreshToken = refresh_token;
            return tokenData.save();
        }
        const token = await Refresh_Token.create({user: id_user, refresh_token})
        return token;
    }
}

module.exports = new TokenService();