const { Methodological_rec } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

class MethodController {

        async create(req, res, next) {
            try {
                const { title, description, language, year_create, quantity_pages, subjectId, TypeMethodId, date_realese } = req.body;
    
                // Check if a file was uploaded
                if (!req.files || !req.files.file) {
                    return next(ApiError.badRequest('No file uploaded'));
                }
    
                const file = req.files.file;
                const fileName = `${uuid.v4()}${path.extname(file.name)}`;
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
    
                await file.mv(filePath);
    
                const methodological_rec = await Methodological_rec.create({ 
                    title, 
                    description, 
                    language, 
                    year_create, 
                    quantity_pages, 
                    subjectId, 
                    TypeMethodId, 
                    date_realese,
                    url: fileName 
                });
    
                return res.json(methodological_rec);
            } catch (err) {
                console.error('Error creating methodological record:', err);
                return next(ApiError.internal('Failed to create methodological record'));
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
                    console.error('Failed to retrieve methodological records:', error);
                    return res.status(500).json({ error: 'Failed to retrieve methodological records' });
                }
            }
        

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        try {
            const met = await Methodological_rec.findByPk(id);
            if (!met) {
                return next(ApiError.notFound('Methodological record not found'));
            }

            return res.json(met);
        } catch (error) {
            return next(ApiError.internal('Failed to retrieve methodological record'));
        }
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
            return res.status(500).json({ error: 'Failed to delete methodological record' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, language, year_create, quantity_pages, subjectId, TypeMethodId, date_realese } = req.body;
            const urlFile = req.files ? req.files.url : null;
            let url = '';

            const met = await Methodological_rec.findByPk(id);
            if (!met) {
                return res.status(404).json({ error: 'Methodological record not found' });
            }

            if (urlFile) {
                url = uuid.v4() + path.extname(urlFile.name);
                const filePath = path.resolve(__dirname, '..', 'static', url);
                await urlFile.mv(filePath);
            } else {
                url = met.url; // Preserve existing URL if no new file uploaded
            }

            await met.update({ title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId, date_realese });
            return res.json({ message: 'Methodological record updated successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update methodological record' });
        }
    }

    async search(req, res, next) {
        try {
            console.log("Received search request with query:", req.query);
            const { query } = req.query;
            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }
            const isValidDate = !isNaN(Date.parse(query));
            const conditions = {
                [Op.or]: [
                    { title: { [Op.like]: `%${query}%` } },
                    { url: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                    { language: { [Op.like]: `%${query}%` } },
                    { year_create: { [Op.like]: `%${query}%` } },
                    { quantity_pages: { [Op.like]: `%${query}%` } },
                ]
            };
            if (isValidDate) {
                const date = new Date(query);
                conditions[Op.or].push({
                    date_realese: {
                        [Op.gte]: new Date(date.setHours(0, 0, 0, 0)),
                        [Op.lte]: new Date(date.setHours(23, 59, 59, 999))
                    }
                });
            }
            const met = await Syllabus.findAll({ where: conditions });
            if (met.length === 0) {
                return next(ApiError.notFound('No methodological record found matching the query'));
            }
            console.log("Search results:", met);
            return res.json(met);
        } catch (err) {
            console.error('Error during search:', err);
            return next(ApiError.internal(err.message));
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
                    return next(ApiError.internal('Failed to download file'));
                }
            });
        });
    }
}

module.exports = new MethodController();
