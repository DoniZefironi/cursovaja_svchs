const {Subject} = require('../models/models')
const ApiError = require('../error/ApiError')

class SubjectController {
    async create(req, res) {
        const { name, description, syllabusId } = req.body;
        const subject = await Subject.create({name, description, syllabusId});
        return res.json(subject);
    }

    async getAll(req, res) {
        const {syllabusId} = req.body;
        let subject;
        if (!syllabusId) {
            subject = await Subject.findAll()
        }
        if (syllabusId) {
            subject = await Subject.findAll({where:{syllabusId}})
        }
        return res.json(subject)
    }

    async getOne(req, res) {
        
    }

    async deleteOne(req, res) {
        
    }
}

module.exports = new SubjectController()