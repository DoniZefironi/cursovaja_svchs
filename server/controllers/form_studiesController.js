const { FormStudy } = require('../models/models'); 
const ApiError = require('../error/ApiError');

class FormStudiesController {
    async create(req, res, next) {
        try {
            const { type } = req.body;
            const formStudy = new FormStudy({ type });
            await formStudy.save();
            return res.json(formStudy);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const formStudies = await FormStudy.find();
            return res.json(formStudies);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const formStudy = await FormStudy.findById(id);
            if (!formStudy) {
                return next(ApiError.notFound('Form study not found'));
            }
            return res.json(formStudy);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async updateOne(req, res, next) {
        try {
            const { id } = req.params;
            const { type } = req.body;
            const formStudy = await FormStudy.findById(id);
            if (!formStudy) {
                return next(ApiError.notFound('Form study not found'));
            }
            formStudy.type = type;
            await formStudy.save();
            return res.json(formStudy);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;
            const formStudy = await FormStudy.findById(id);
            if (!formStudy) {
                return next(ApiError.notFound('Form study not found'));
            }
            await formStudy.deleteOne();
            return res.json({ message: 'Form study deleted' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            const formStudies = await FormStudy.find({
                type: { $regex: query, $options: 'i' } 
            });
            return res.json(formStudies);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new FormStudiesController();
