const { SpecialityMethod, Speciality, MethodologicalRec } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class SpecialityMethodsController {
    async create(req, res, next) {
        try {
            const { specialityId, methodologicalRecId } = req.body;
            const specialityMethod = new SpecialityMethod({ specialityId, methodologicalRecId });
            await specialityMethod.save();
            return res.json(specialityMethod);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            console.log('Fetching all speciality methods...');
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where.$or = [
                    { 'specialityId.code': { $regex: search, $options: 'i' } },
                    { 'methodologicalRecId.title': { $regex: search, $options: 'i' } },
                    { 'methodologicalRecId.description': { $regex: search, $options: 'i' } },
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const specialityMethods = await SpecialityMethod.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 })
                .populate('specialityId', 'id code')
                .populate('methodologicalRecId', 'id title description');

            const total = await SpecialityMethod.countDocuments(where);

            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: specialityMethods
            });
        } catch (error) {
            console.error('Error fetching speciality methods:', error);
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const specialityMethod = await SpecialityMethod.findById(id)
                .populate('specialityId', 'id code')
                .populate('methodologicalRecId', 'id title description');
            if (!specialityMethod) {
                return next(ApiError.notFound('Speciality method not found'));
            }
            return res.json(specialityMethod);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { specialityId, methodologicalRecId } = req.body;
            const specialityMethod = await SpecialityMethod.findById(id);
            if (!specialityMethod) {
                return next(ApiError.notFound('Speciality method not found'));
            }
            specialityMethod.specialityId = specialityId;
            specialityMethod.methodologicalRecId = methodologicalRecId;
            await specialityMethod.save();
            return res.json(specialityMethod);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const specialityMethod = await SpecialityMethod.findById(id);
            if (!specialityMethod) {
                return next(ApiError.notFound('Speciality method not found'));
            }
            await specialityMethod.deleteOne();
            return res.json({ message: 'Speciality method deleted' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            const specialityMethods = await SpecialityMethod.find()
                .populate({
                    path: 'specialityId',
                    match: { code: { $regex: query, $options: 'i' } },
                    select: 'id code'
                })
                .populate('methodologicalRecId', 'id title description');
            return res.json(specialityMethods);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new SpecialityMethodsController();
