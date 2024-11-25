const {Speciality} = require('../models/models')
const ApiError = require('../error/ApiError')

class SpecialityController {
    async create(req, res) {
        const { code, qualification } = req.body;
        const speciality = await Speciality.create({code, qualification});
        return res.json(speciality);
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

    async deleteOne(req, res) {
        
    }
}

module.exports = new SpecialityController()