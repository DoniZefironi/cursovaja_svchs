const { Speciality } = require('../models/models');
const ApiError = require('../error/ApiError');

class SpecialityController {
    async create(req, res) {
        try{
            const { code, qualification, formStudyId } = req.body;
            const speciality = await Speciality.create({ code, qualification, formStudyId });
            return res.json(speciality);
        } catch (err) {
            return res.status(500).json({ error: 'Failder to create specialities'});
        }
    }

        async getAll(req, res) {
            try {
                const specialities = await Speciality.findAll();
                console.log('Fetched Specialities from DB:', specialities); // Логирование данных
                return res.json(specialities);
            } catch (error) {
                console.log('Error fetching specialities:', error);
                return res.status(500).json({ error: 'Failed to retrieve specialities' });
            }
        }
    

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        const speciality = await Speciality.findByPk(id);
        if (!speciality) {
            return next(ApiError.notFound('Speciality not found'));
        }

        return res.json(speciality);
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

    async update(req, res) {
        try {
            const { id } = req.params;
            const { code, qualification, formStudyId } = req.body;

            const speciality = await Speciality.findByPk(id);
            if (!speciality) {
                return res.status(404).json({ error: 'Speciality not found' });
            }

            await speciality.update({ code, qualification, formStudyId });
            return res.json({ message: 'Speciality updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update speciality' });
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }

            const speciality = await Speciality.findAll({
                where: {
                    [Op.or]: [
                        { code: { [Op.like]: `%${query}%` } },
                        { qualification: { [Op.like]: `%${query}%` } },
                        { formStudyId: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            if (speciality.length === 0) {
                return next(ApiError.notFound('No speciality found matching the query'));
            }

            return res.json(speciality);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }
}

module.exports = new SpecialityController();