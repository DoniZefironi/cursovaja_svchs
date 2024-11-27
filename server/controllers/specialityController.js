const { Speciality } = require('../models/models');
const ApiError = require('../error/ApiError');

class SpecialityController {
    async create(req, res) {
        const { code, qualification, formStudyId } = req.body;
        const speciality = await Speciality.create({ code, qualification, formStudyId });
        return res.json(speciality);
    }

    async getAll(req, res) {
        const { formStudyId } = req.query;
        let speciality;
        if (!formStudyId) {
            speciality = await Speciality.findAll();
        } else {
            speciality = await Speciality.findAll({ where: { formStudyId } });
        }
        return res.json(speciality);
    }

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }
        res.json(id);
    }

    async deleteOne(req, res) {
        const { id } = req.params;

        try {
            const speciality = await Speciality.findByPk(id);
            if (!speciality) {
                return res.status(404).json({ error: 'Speciality not found' });
            }

            await speciality.destroy();
            return res.json({ message: 'Speciality deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete speciality' });
        }
    }
}

module.exports = new SpecialityController();