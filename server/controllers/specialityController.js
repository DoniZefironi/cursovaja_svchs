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
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { code: { [Op.like]: `%${search}%` } },
                    { qualification: { [Op.like]: `%${search}%` } },
                    { formStudyId: { [Op.like]: `%${search}%` } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const specialities = await Speciality.findAndCountAll({
                where,
                limit,
                offset,
                order: [[sortBy, order]]
            });

            return res.json({
                total: specialities.count,
                pages: Math.ceil(specialities.count / limit),
                data: specialities.rows
            });
        } catch (error) {
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