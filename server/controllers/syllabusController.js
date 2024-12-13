const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { Syllabus } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class SyllabusController {
    async create(req, res, next) {
        try {
            const { date, name } = req.body;
            const { syllfile } = req.files;

            if (!syllfile) {
                return next(ApiError.badRequest('No file uploaded'));
            }

            const fileName = uuid.v4() + path.extname(syllfile.name);
            const filePath = path.resolve(__dirname, '..', 'static', fileName);

            await syllfile.mv(filePath); // Используем await для обработки ошибок
            const syllabus = await Syllabus.create({ date, name, syllfile: fileName });

            return res.json(syllabus);
        } catch (err) {
            console.error('Error creating syllabus:', err);
            return next(ApiError.internal('Failed to create syllabus'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { date: { [Op.like]: `%${search}%` } },
                    { name: { [Op.like]: `%${search}%` } }
                ];
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
            console.error('Error retrieving syllabuses:', error);
            return next(ApiError.internal('Failed to retrieve syllabuses'));
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { date, name } = req.body;
            const syllfile = req.files ? req.files.syllfile : null;

            const syllabus = await Syllabus.findByPk(id);
            if (!syllabus) {
                return next(ApiError.notFound('Syllabus not found'));
            }

            let fileName = syllabus.syllfile;
            if (syllfile) {
                fileName = uuid.v4() + path.extname(syllfile.name);
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                await syllfile.mv(filePath); // Используем await для обработки ошибок
            }

            await syllabus.update({ date, name, syllfile: fileName });
            return res.json({ message: 'Syllabus updated successfully' });
        } catch (err) {
            console.error('Error updating syllabus:', err);
            return next(ApiError.internal('Failed to update syllabus'));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;

            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }

            const isValidDate = !isNaN(Date.parse(query));
            const conditions = {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { syllfile: { [Op.like]: `%${query}%` } }
                ]
            };

            if (isValidDate) {
                const date = new Date(query);
                conditions[Op.or].push({
                    date: {
                        [Op.gte]: new Date(date.setHours(0, 0, 0, 0)),
                        [Op.lte]: new Date(date.setHours(23, 59, 59, 999))
                    }
                });
            }

            const syllabuses = await Syllabus.findAll({ where: conditions });

            if (syllabuses.length === 0) {
                return next(ApiError.notFound('No syllabus found matching the query'));
            }

            return res.json(syllabuses);
        } catch (err) {
            console.error('Error searching syllabuses:', err);
            return next(ApiError.internal('Failed to search syllabuses'));
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;

        try {
            const syllabus = await Syllabus.findByPk(id);
            if (!syllabus) {
                return next(ApiError.notFound('Syllabus not found'));
            }

            const filePath = path.resolve(__dirname, '..', 'static', syllabus.syllfile);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });

            await syllabus.destroy();
            return res.json({ message: 'Syllabus deleted successfully' });
        } catch (error) {
            console.error('Error deleting syllabus:', error);
            return next(ApiError.internal('Failed to delete syllabus'));
        }
    }

    async downloadFile(req, res, next) {
        const { filename } = req.params;
        const filePath = path.resolve(__dirname, '..', 'static', filename);
    
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return next(ApiError.notFound('File not found'));
            }
    
            res.download(filePath, filename, (err) => {
                if (err) {
                    return next(ApiError.internal('File download failed'));
                }
            });
        });
    }
}

module.exports = new SyllabusController();