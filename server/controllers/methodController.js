const { Methodological_rec } = require('../models/models');
const ApiError = require('../error/ApiError');

class MethodController {
    async create(req, res) {
        try{
            const { title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId } = req.body;
            const met = await Methodological_rec.create({ title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId });
            return res.json(met);
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
                    { title: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                    { language: { [Op.like]: `%${search}%` } },
                    { year_create: { [Op.like]: `%${search}%` } },
                    { url: { [Op.like]: `%${search}%` } },
                    { quantity_pages: { [Op.like]: `%${search}%` } },
                    { subjectId: { [Op.like]: `%${search}%` } },
                    { TypeMethodId: { [Op.like]: `%${search}%` } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const met = await Methodological_rec.findAndCountAll({
                where,
                limit,
                offset,
                order: [[sortBy, order]]
            });

            return res.json({
                total: met.count,
                pages: Math.ceil(met.count / limit),
                data: met.rows
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve methodological rec.' });
        }
    }

    async getOne(req, res) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        const met = await Methodological_rec.findByPk(id);
        if (!met) {
            return next(ApiError.notFound('methodological rec. not found'));
        }

        return res.json(met);
    }

    async deleteOne(req, res) {
        const { id } = req.params;

        try {
            const met = await Methodological_rec.findByPk(id);
            if (!met) {
                return res.status(404).json({ error: 'Methodological record not found' });
            }

            await met.destroy();
            return res.json({ message: 'Methodological record deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete methodological rec ord' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId } = req.body;

            const met = await Methodological_rec.findByPk(id);
            if (!met) {
                return res.status(404).json({ error: 'methodological rec not found' });
            }

            await met.update({ title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId });
            return res.json({ message: 'methodological rec updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update methodological rec' });
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }

            const met = await Methodological_rec.findAll({
                where: {
                    [Op.or]: [
                        { title: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } },
                        { language: { [Op.like]: `%${query}%` } },
                        { year_create: { [Op.like]: `%${query}%` } },
                        { url: { [Op.like]: `%${query}%` } },
                        { quantity_pages: { [Op.like]: `%${query}%` } },
                        { subjectId: { [Op.like]: `%${query}%` } },
                        { TypeMethodId: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            if (met.length === 0) {
                return next(ApiError.notFound('No methodological rec. found matching the query'));
            }

            return res.json(met);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }
}

module.exports = new MethodController();