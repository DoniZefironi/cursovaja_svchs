const {Methodological_rec} = require('../models/models')
const ApiError = require('../error/ApiError')

class MethodController {
    async create(req, res) {
        const { title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId } = req.body;
        const met = await Methodological_rec.create({title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId});
        return res.json(met);
    }

    async getAll(req, res) {
        const {subjectId, TypeMethodId} = req.body;
        let met;
        if (!subjectId & !TypeMethodId) {
            met = await Methodological_rec.findAll()
        }
        if (subjectId & !TypeMethodId) {
            met = await Methodological_rec.findAll({where:{syllabusId}})
        }
        if (!subjectId & TypeMethodId) {
            met = await Methodological_rec.findAll({where:{syllabusId, TypeMethodId}})
        }
        return res.json(met)
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
            const met = await Methodological_rec.findByPk(id);
            if (!met) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            await met.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }

}

module.exports = new MethodController()