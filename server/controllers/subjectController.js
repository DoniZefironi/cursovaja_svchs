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
        const {id} = req.query
        if (!id){
            return next(ApiError.bodRequest('Не задан ID'))
        }
        res.json(id);
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        
        try {
            const subject = await Subject.findByPk(id);
            if (!subject) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            await subject.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}

module.exports = new SubjectController()