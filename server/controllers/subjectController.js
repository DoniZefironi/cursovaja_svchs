const { Subject } = require('../models/models');
const ApiError = require('../error/ApiError');

class SubjectController {
    async create(req, res) {
        const { name, description, syllabusId } = req.body;
        const subject = await Subject.create({ name, description, syllabusId });
        return res.json(subject);
    }

    async getAll(req, res) {
        let { syllabusId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let subject;
        if (!syllabusId) {
            subject = await Subject.findAndCountAll({ limit, offset });
        } else {
            subject = await Subject.findAndCountAll({ where: { syllabusId }, limit, offset });
        }
        return res.json(subject);
    }

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        const subject = await Subject.findByPk(id);
        if (!subject) {
            return next(ApiError.notFound('Subject not found'));
        }

        return res.json(subject);
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, syllabusId } = req.body;

            const subject = await Subject.findByPk(id);
            if (!subject) {
                return next(ApiError.notFound('Subject not found'));
            }

            await subject.update({ name, description, syllabusId });
            return res.json({ message: 'Subject updated successfully' });
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }

            const subjects = await Subject.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { description: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            if (subjects.length === 0) {
                return next(ApiError.notFound('No subjects found matching the query'));
            }

            return res.json(subjects);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async deleteOne(req, res) {
        const { id } = req.params;

        try {
            const subject = await Subject.findByPk(id);
            if (!subject) {
                return res.status(404).json({ error: 'Subject not found' });
            }

            await subject.destroy();
            return res.json({ message: 'Subject deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete subject' });
        }
    }
}

module.exports = new SubjectController();