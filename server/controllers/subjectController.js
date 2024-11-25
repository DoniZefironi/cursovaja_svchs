const {Subject} = require('../models/models')
const ApiError = require('../error/ApiError')

class SubjectController {
    async create(req, res) {
        const { name, description } = req.body;
        const subject = await Subject.create({name, description});
        return res.json(subject);
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

    async deleteOne(req, res) {
        
    }
}

module.exports = new SubjectController()