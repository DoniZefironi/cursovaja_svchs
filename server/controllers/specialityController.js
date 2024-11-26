const {Speciality} = require('../models/models')
const ApiError = require('../error/ApiError')

class SpecialityController {
    async create(req, res) {
        const { code, qualification, formStudyId } = req.body;
        const speciality = await Speciality.create({code, qualification, formStudyId});
        return res.json(speciality);
    }

    async getAll(req, res) {
        const {formStudyId} = req.body;
        let speciality;
        if (!formStudyId) {
            speciality = await Speciality.findAll()
        }
        if (formStudyId) {
            speciality = await Speciality.findAll({where:{syllabusId}})
        }
        return res.json(speciality)
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
            const speciality = await Speciality.findByPk(id);
            if (!speciality) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            await speciality.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}

module.exports = new SpecialityController()