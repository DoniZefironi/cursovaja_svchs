const { Speciality } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class SpecialityController {
    async create(req, res, next) {
        try {
            const { code, qualification, formStudyId } = req.body;
            const speciality = new Speciality({ code, qualification, formStudyId });
            await speciality.save();
            return res.json(speciality);
        } catch (err) {
            return next(ApiError.internal('Failed to create speciality'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where.$or = [
                    { code: { $regex: search, $options: 'i' } },
                    { qualification: { $regex: search, $options: 'i' } },
                    { formStudyId: { $regex: search, $options: 'i' } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const specialities = await Speciality.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 });

            const total = await Speciality.countDocuments(where);

            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: specialities
            });
        } catch (error) {
            console.log('Error fetching specialities:', error);
            return next(ApiError.internal('Failed to retrieve specialities'));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        try {
            const speciality = await Speciality.findById(id);
            if (!speciality) {
                return next(ApiError.notFound('Speciality not found'));
            }

            return res.json(speciality);
        } catch (error) {
            return next(ApiError.internal('Failed to retrieve speciality'));
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;

        try {
            const speciality = await Speciality.findById(id);
            if (!speciality) {
                return next(ApiError.notFound('Speciality not found'));
            }

            await speciality.deleteOne();
            return res.json({ message: 'Speciality deleted successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to delete speciality'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { code, qualification, formStudyId } = req.body;

            const speciality = await Speciality.findById(id);
            if (!speciality) {
                return next(ApiError.notFound('Speciality not found'));
            }

            speciality.code = code;
            speciality.qualification = qualification;
            speciality.formStudyId = formStudyId;
            await speciality.save();

            return res.json({ message: 'Speciality updated successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to update speciality'));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            if (!query) {
                return next(ApiError.badRequest('Search query not provided'));
            }

            const specialities = await Speciality.find({
                $or: [
                    { code: { $regex: query, $options: 'i' } },
                    { qualification: { $regex: query, $options: 'i' } },
                    { formStudyId: { $regex: query, $options: 'i' } }
                ]
            });

            if (specialities.length === 0) {
                return next(ApiError.notFound('No speciality found matching the query'));
            }

            return res.json(specialities);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }
}

module.exports = new SpecialityController();
