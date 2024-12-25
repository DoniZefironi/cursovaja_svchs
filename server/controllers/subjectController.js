const { Subject } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class SubjectController {
    async create(req, res) {
        try {
            const { name, description, syllabusId } = req.body;
            const subject = await Subject.create({ name, description, syllabusId });
            return res.json(subject);
        } catch (error) {
            console.error('Failed to create subject:', error);
            return res.status(500).json({ message: 'Failed to create subject' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, syllabusId } = req.body;
            const subject = await Subject.findByPk(id);
            if (!subject) {
                return res.status(404).json({ message: 'Subject not found' });
            }
            await subject.update({ name, description, syllabusId });
            return res.json(subject);
        } catch (error) {
            console.error('Failed to update subject:', error);
            return res.status(500).json({ message: 'Failed to update subject' });
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const subjects = await Subject.findAndCountAll({
                where,
                limit,
                offset,
                order: [[sortBy, order]]
            });

            console.log("Subjects fetched from database:", subjects.rows);

            return res.json({
                total: subjects.count,
                pages: Math.ceil(subjects.count / limit),
                data: subjects.rows
            });
        } catch (error) {
            console.error("Error retrieving subjects:", error);
            return res.status(500).json({ error: 'Failed to retrieve subjects' });
        }
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
            console.log("Received search request with query:", req.query);
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
                return res.status(404).json({ message: 'No subjects found matching the query' });
            }

            console.log("Search results:", subjects);
            return res.json(subjects);
        } catch (err) {
            console.error('Error during search:', err);
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
