const uuid = require('uuid');
const path = require('path');
const { Syllabus } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class SyllabusController {
    async create(req, res, next) {
        try {
            const { date } = req.body;
            const { syllfile } = req.files;

            if (!syllfile) {
                return next(ApiError.badRequest('No file uploaded'));
            }

            let fileName = uuid.v4() + path.extname(syllfile.name);
            let filePath = path.resolve(__dirname, '..', 'static', fileName);

            syllfile.mv(filePath, (err) => {
                if (err) {
                    return next(ApiError.internal('File upload failed'));
                }
            });

            const syllabus = await Syllabus.create({ date, syllfile: fileName });
            return res.json(syllabus);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create syllabus' });
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { date: { [Op.like]: `%${search}%` } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const syllabuses = await Syllabus.findAndCountAll({
                where,
                limit,
                offset,
                order: [[sortBy, order]]
            });

            return res.json({
                total: syllabuses.count,
                pages: Math.ceil(syllabuses.count / limit),
                data: syllabuses.rows
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to retrieve syllabuses' });
        }
    }

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        const syllabus = await Syllabus.findByPk(id);
        if (!syllabus) {
            return next(ApiError.notFound('Syllabus not found'));
        }

        return res.json(syllabus);
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { date } = req.body;
            const { syllfile } = req.files;

            const syllabus = await Syllabus.findByPk(id);
            if (!syllabus) {
                return next(ApiError.notFound('Syllabus not found'));
            }

            let fileName = syllabus.syllfile;
            if (syllfile) {
                fileName = uuid.v4() + path.extname(syllfile.name);
                let filePath = path.resolve(__dirname, '..', 'static', fileName);

                syllfile.mv(filePath, (err) => {
                    if (err) {
                        return next(ApiError.internal('File upload failed'));
                    }
                });
            }

            await syllabus.update({ date, syllfile: fileName });
            return res.json({ message: 'Syllabus updated successfully' });
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

            const syllabus = await Syllabus.findAll({
                where: {
                    [Op.or]: [
                        { date: { [Op.like]: `%${query}%` } },
                        { syllfile: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            if (syllabus.length === 0) {
                return next(ApiError.notFound('No syllabus found matching the query'));
            }

            return res.json(syllabus);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;

        try {
            const syllabus = await Syllabus.findByPk(id);
            if (!syllabus) {
                return res.status(404).json({ error: 'Syllabus not found' });
            }

            await syllabus.destroy();
            return res.json({ message: 'Syllabus deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete syllabus' });
        }
    }
}

module.exports = new SyllabusController();