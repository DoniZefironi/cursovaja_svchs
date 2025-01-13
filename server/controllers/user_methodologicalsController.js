const { UserMethodological, User, MethodologicalRec } = require('../models/models');
const ApiError = require('../error/ApiError');

class UserMethodologicalsController {
    async create(req, res, next) {
        try {
            const { userId, methodologicalId } = req.body;
            console.log('Creating UserMethodological with:', { userId, methodologicalId });
            if (!userId || !methodologicalId) {
                return res.status(400).json({ error: "userId и methodologicalId обязательны" });
            }
            const userMethodological = new UserMethodological({
                userId: userId,
                methodologicalRecId: methodologicalId
            });
            await userMethodological.save();
            return res.json(userMethodological);
        } catch (error) {
            console.error('Error creating UserMethodological:', error);
            next(ApiError.internal(error.message));
        }
    }
    

    async getAll(req, res, next) {
        try {
            const { page = 1, limit = 10, sortBy = 'id', order = 'ASC', search = '', filter = {} } = req.query;
            const offset = (page - 1) * limit;
            const where = {};

            if (search) {
                where.$or = [
                    { 'userId.name': { $regex: search, $options: 'i' } },
                    { 'methodologicalRecId.title': { $regex: search, $options: 'i' } },
                ];
            }

            for (const key in filter) {
                if (filter.hasOwnProperty(key)) {
                    where[key] = filter[key];
                }
            }

            const userMethodologicals = await UserMethodological.find(where)
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order === 'ASC' ? 1 : -1 })
                .populate('userId', 'id name surname')
                .populate('methodologicalRecId', 'id title');

            const total = await UserMethodological.countDocuments(where);

            return res.json({
                total: total,
                pages: Math.ceil(total / limit),
                data: userMethodologicals
            });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const userMethodological = await UserMethodological.findById(id)
                .populate('userId', 'id name surname')
                .populate('methodologicalRecId', 'id title');
            if (!userMethodological) {
                return next(ApiError.notFound('UserMethodological не найден'));
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
            const userMethodological = await UserMethodological.findById(id);
            if (!userMethodological) {
                return next(ApiError.notFound('UserMethodological не найден'));
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
            const userMethodological = await UserMethodological.findById(id);
            if (!userMethodological) {
                return next(ApiError.notFound('UserMethodological не найден'));
            }
            await userMethodological.deleteOne();
            return res.json({ message: 'UserMethodological удален' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            const userMethodologicals = await UserMethodological.find()
                .populate({
                    path: 'userId',
                    match: { name: { $regex: query, $options: 'i' } },
                    select: 'id name surname'
                })
                .populate('methodologicalRecId', 'id title');
            return res.json(userMethodologicals);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new UserMethodologicalsController();
