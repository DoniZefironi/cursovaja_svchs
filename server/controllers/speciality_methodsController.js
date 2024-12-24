const { Speciality_method, Speciality, Methodological_rec } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class SpecialityMethodsController {
    async create(req, res, next) {
        try {
            const { specialityId, methodologicalRecId } = req.body;
            const specialityMethod = await Speciality_method.create({ specialityId, methodologicalRecId });
            return res.json(specialityMethod);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            console.log('Fetching all speciality methods...');
            const specialityMethods = await Speciality_method.findAll({
                include: [
                    { model: Speciality, attributes: ['id', 'code'] },
                    { model: Methodological_rec, attributes: ['id', 'title', 'description'] }
                ]
            });
            console.log('Fetched Speciality Methodologicals:', specialityMethods);
            return res.json(specialityMethods);
        } catch (error) {
            console.error('Error fetching speciality methods:', error);
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const specialityMethod = await Speciality_method.findOne({
                where: { id },
                include: [
                    { model: Speciality, attributes: ['id', 'code'] },
                    { model: Methodological_rec, attributes: ['id', 'title', 'description'] }
                ]
            });
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
            const specialityMethod = await Speciality_method.findByPk(id);
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
                include: [
                    { model: Speciality, where: { code: { [Op.like]: `%${query}%` } }, attributes: ['id', 'code'] },
                    { model: Methodological_rec, attributes: ['id', 'title', 'description'] }
                ]
            });
            return res.json(specialityMethods);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new SpecialityMethodsController();
