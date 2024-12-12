const { Type_method } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

class TypeMethodController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const typeMethod = await Type_method.create({ name });
            return res.json(typeMethod);
        } catch (error) {
            console.error('Failed to create type method:', error);
            return res.status(500).json({ message: 'Failed to create type method' });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const typeMethod = await Type_method.findByPk(id);
            if (!typeMethod) {
                return res.status(404).json({ message: 'Type method not found' });
            }
            await typeMethod.update({ name });
            return res.json(typeMethod);
        } catch (error) {
            console.error('Failed to update type method:', error);
            return res.status(500).json({ message: 'Failed to update type method' });
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const typeMethods = await Type_method.findAndCountAll({
                where,
                limit,
                offset,
                order: [[sortBy, order]]
            });

            return res.json({
                total: typeMethods.count,
                pages: Math.ceil(typeMethods.count / limit),
                data: typeMethods.rows
            });
        } catch (error) {
            console.error('Failed to retrieve type methods:', error);
            return res.status(500).json({ message: 'Failed to retrieve type methods' });
        }
    }

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        const typeMethod = await Type_method.findByPk(id);
        if (!typeMethod) {
            return next(ApiError.notFound('Type method not found'));
        }

        return res.json(typeMethod);
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const typeMethod = await Type_method.findByPk(id);
            if (!typeMethod) {
                return next(ApiError.notFound('Type method not found'));
            }

            await typeMethod.update({ name });
            return res.json({ message: 'Type method updated successfully' });
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

            const typeMethods = await Type_method.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } }
                    ]
                }
            });

            if (typeMethods.length === 0) {
                return res.status(404).json({ message: 'No type methods found matching the query' });
            }

            return res.json(typeMethods);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async deleteOne(req, res) {
        const { id } = req.params;

        try {
            const typeMethod = await Type_method.findByPk(id);
            if (!typeMethod) {
                return res.status(404).json({ message: 'Type method not found' });
            }

            await typeMethod.destroy();
            return res.json({ message: 'Type method deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete type method' });
        }
    }
}

module.exports = new TypeMethodController();
