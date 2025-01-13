const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { Syllabus } = require('../models/models'); 
const ApiError = require('../error/ApiError');

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

            await syllfile.mv(filePath); 
            const syllabus = new Syllabus({ date, name, syllfile: fileName });
            await syllabus.save();

            return res.json(syllabus);
        } catch (err) {
            console.error('Error creating syllabus:', err);
            return next(ApiError.internal('Failed to create syllabus'));
        }
    }

    async getAll(req, res, next) {
        try {
            console.log("Received request to get all syllabuses");
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {}, year } = req.query;
            const offset = (page - 1) * limit;
            const where = {};
    
            if (search) {
                where.$or = [
                    { date: { $regex: search, $options: 'i' } },
                    { name: { $regex: search, $options: 'i' } }
                ];
            }
    
            if (year) {
                where.date = {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                };
            }
    
            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }
    
            const syllabuses = await Syllabus.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 });
    
            const total = await Syllabus.countDocuments(where);
    
            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: syllabuses
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

            const syllabus = await Syllabus.findById(id);
            if (!syllabus) {
                return next(ApiError.notFound('Syllabus not found'));
            }

            let fileName = syllabus.syllfile;
            if (syllfile) {
                fileName = uuid.v4() + path.extname(syllfile.name);
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                await syllfile.mv(filePath); 
            }

            syllabus.date = date;
            syllabus.name = name;
            syllabus.syllfile = fileName;
            await syllabus.save();

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
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { syllfile: { $regex: query, $options: 'i' } }
                ]
            };

            if (isValidDate) {
                const date = new Date(query);
                conditions.$or.push({
                    date: {
                        $gte: new Date(date.setHours(0, 0, 0, 0)),
                        $lte: new Date(date.setHours(23, 59, 59, 999))
                    }
                });
            }

            const syllabuses = await Syllabus.find(conditions);

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
            const syllabus = await Syllabus.findById(id);
            if (!syllabus) {
                return next(ApiError.notFound('Syllabus not found'));
            }

            const filePath = path.resolve(__dirname, '..', 'static', syllabus.syllfile);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                }
            });

            await syllabus.deleteOne();
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
