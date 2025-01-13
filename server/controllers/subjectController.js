const { Subject } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class SubjectController {
    async create(req, res, next) {
        try {
            const { name, description, syllabusId } = req.body;
            const subject = new Subject({ name, description, syllabusId });
            await subject.save();
            return res.json(subject);
        } catch (error) {
            console.error('Failed to create subject:', error);
            return next(ApiError.internal('Failed to create subject'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, syllabusId } = req.body;
            const subject = await Subject.findById(id);
            if (!subject) {
                return next(ApiError.notFound('Subject not found'));
            }
            subject.name = name;
            subject.description = description;
            subject.syllabusId = syllabusId;
            await subject.save();
            return res.json(subject);
        } catch (error) {
            console.error('Failed to update subject:', error);
            return next(ApiError.internal('Failed to update subject'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};
    
            if (search) {
                where.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
    
            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }
    
            const subjects = await Subject.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 });
    
            const total = await Subject.countDocuments(where);
    
            console.log("Subjects fetched from database:", subjects);
    
            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: subjects
            });
        } catch (error) {
            console.error('Error retrieving subjects:', error);
            return next(ApiError.internal('Failed to retrieve subjects'));
        }
    }
    

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        try {
            const subject = await Subject.findById(id);
            if (!subject) {
                return next(ApiError.notFound('Subject not found'));
            }

            return res.json(subject);
        } catch (error) {
            return next(ApiError.internal('Failed to retrieve subject'));
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name, description, syllabusId } = req.body;

            const subject = await Subject.findById(id);
            if (!subject) {
                return next(ApiError.notFound('Subject not found'));
            }

            subject.name = name;
            subject.description = description;
            subject.syllabusId = syllabusId;
            await subject.save();

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

            const subjects = await Subject.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            });

            if (subjects.length === 0) {
                return next(ApiError.notFound('No subjects found matching the query'));
            }

            console.log("Search results:", subjects);
            return res.json(subjects);
        } catch (err) {
            console.error('Error during search:', err);
            return next(ApiError.internal(err.message));
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;

        try {
            const subject = await Subject.findById(id);
            if (!subject) {
                return next(ApiError.notFound('Subject not found'));
            }

            await subject.deleteOne();
            return res.json({ message: 'Subject deleted successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to delete subject'));
        }
    }
}

module.exports = new SubjectController();
