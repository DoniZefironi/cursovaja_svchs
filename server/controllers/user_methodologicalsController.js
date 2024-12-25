const { User_methodological, User, Methodological_rec } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class UserMethodologicalsController {
    async create(req, res, next) {
        try {
            const { userId, methodologicalId } = req.body;
            console.log('Creating UserMethodological with:', { userId, methodologicalId });
            const userMethodological = await User_methodological.create({
                userId: parseInt(userId, 10),
                methodologicalRecId: parseInt(methodologicalId, 10)
            });
            return res.json(userMethodological);
        } catch (error) {
            console.error('Error creating UserMethodological:', error);
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const userMethodologicals = await User_methodological.findAll({
                include: [
                    { model: User, attributes: ['id', 'name', 'surname'] },
                    { model: Methodological_rec, attributes: ['id', 'title'] }
                ]
            });
            console.log('Fetched User Methodologicals:', userMethodologicals);
            return res.json(userMethodologicals);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const userMethodological = await User_methodological.findOne({
                where: { id },
                include: [
                    { model: User, attributes: ['id', 'name', 'surname'] },
                    { model: Methodological_rec, attributes: ['id', 'title'] }
                ]
            });
            if (!userMethodological) {
                return next(ApiError.notFound('UserMethodological not found'));
            }
            return res.json(userMethodological);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { userId, methodologicalRecId } = req.body;
            const userMethodological = await User_methodological.findByPk(id);
            if (!userMethodological) {
                return next(ApiError.notFound('UserMethodological not found'));
            }
            userMethodological.userId = userId;
            userMethodological.methodologicalRecId = methodologicalRecId;
            await userMethodological.save();
            return res.json(userMethodological);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const userMethodological = await User_methodological.findByPk(id);
            if (!userMethodological) {
                return next(ApiError.notFound('UserMethodological not found'));
            }
            await userMethodological.destroy();
            return res.json({ message: 'UserMethodological deleted' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            const userMethodologicals = await User_methodological.findAll({
                include: [
                    { model: User, where: { name: { [Op.like]: `%${query}%` } }, attributes: ['id', 'name', 'surname'] },
                    { model: Methodological_rec, attributes: ['id', 'title'] }
                ]
            });
            return res.json(userMethodologicals);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UserMethodologicalsController();
