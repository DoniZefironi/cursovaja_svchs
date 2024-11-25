const {Syllabus} = require('../models/models')
const ApiError = require('../error/ApiError')

class SyllabusController {
    async create(req, res) {
        const { date } = req.body;
        const syllabus = await Syllabus.create({date});
        return res.json(syllabus);
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

    async deleteOne(req, res) {
        
    }
}

module.exports = new SyllabusController()