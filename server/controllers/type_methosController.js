const { TypeMethod } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class TypeMethodController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const typeMethod = new TypeMethod({ name });
            await typeMethod.save();
            return res.json(typeMethod);
        } catch (error) {
            console.error('Failed to create type method:', error);
            return next(ApiError.internal('Failed to create type method'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const typeMethod = await TypeMethod.findById(id);
            if (!typeMethod) {
                return next(ApiError.notFound('Type method not found'));
            }
            typeMethod.name = name;
            await typeMethod.save();
            return res.json(typeMethod);
        } catch (error) {
            console.error('Failed to update type method:', error);
            return next(ApiError.internal('Failed to update type method'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where.$or = [
                    { name: { $regex: search, $options: 'i' } }
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const typeMethods = await TypeMethod.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 });

            const total = await TypeMethod.countDocuments(where);

            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: typeMethods
            });
        } catch (error) {
            console.error('Failed to retrieve type methods:', error);
            return next(ApiError.internal('Failed to retrieve type methods'));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('ID not provided'));
        }

        try {
            const typeMethod = await TypeMethod.findById(id);
            if (!typeMethod) {
                return next(ApiError.notFound('Type method not found'));
            }

            return res.json(typeMethod);
        } catch (error) {
            return next(ApiError.internal('Failed to retrieve type method'));
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const typeMethod = await TypeMethod.findById(id);
            if (!typeMethod) {
                return next(ApiError.notFound('Type method not found'));
            }

            typeMethod.name = name;
            await typeMethod.save();
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

            const typeMethods = await TypeMethod.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } }
                ]
            });

            if (typeMethods.length === 0) {
                return next(ApiError.notFound('No type methods found matching the query'));
            }

            return res.json(typeMethods);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;

        try {
            const typeMethod = await TypeMethod.findById(id);
            if (!typeMethod) {
                return next(ApiError.notFound('Type method not found'));
            }

            await typeMethod.deleteOne();
            return res.json({ message: 'Type method deleted successfully' });
        } catch (error) {
            return next(ApiError.internal('Failed to delete type method'));
        }
    }
}

module.exports = new TypeMethodController();
