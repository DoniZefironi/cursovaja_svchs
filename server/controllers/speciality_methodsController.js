const { Speciality_method } = require('../models/models');
const ApiError = require('../error/ApiError');

class SpecialityMethodsController {
    async create(req, res, next) {
        try {
            const { specialityId, methodologicalId } = req.body;
            const specialityMethod = await Speciality_method.create({ specialityId, methodologicalId });
            return res.json(specialityMethod);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const specialityMethods = await Speciality_method.findAll();
            return res.json(specialityMethods);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const specialityMethod = await Speciality_method.findOne({ where: { id } });
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
            const { specialityId, methodologicalId } = req.body;
            const specialityMethod = await Speciality_method.findByPk(id);
            if (!specialityMethod) {
                return next(ApiError.notFound('Speciality method not found'));
            }
            specialityMethod.specialityId = specialityId;
            specialityMethod.methodologicalId = methodologicalId;
            await specialityMethod.save();
            return res.json(specialityMethod);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const specialityMethod = await Speciality_method.findByPk(id);
            if (!specialityMethod) {
                return next(ApiError.notFound('Speciality method not found'));
            }
            await specialityMethod.destroy();
            return res.json({ message: 'Speciality method deleted' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            const specialityMethods = await Speciality_method.findAll({
                where: {
                    specialityId: {
                        [Op.like]: `%${query}%`
                    }
                }
            });
            return res.json(specialityMethods);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new SpecialityMethodsController();
