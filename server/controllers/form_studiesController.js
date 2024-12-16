const { Form_study } = require('../models/models');
const ApiError = require('../error/ApiError');

class FormStudiesController {
    async create(req, res, next) {
        try {
            const { type } = req.body;
            const formStudy = await Form_study.create({ type });
            return res.json(formStudy);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const formStudies = await Form_study.findAll();
            return res.json(formStudies);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const formStudy = await Form_study.findOne({ where: { id } });
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
            const formStudy = await Form_study.findByPk(id);
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
            const formStudy = await Form_study.findByPk(id);
            if (!formStudy) {
                return next(ApiError.notFound('Form study not found'));
            }
            await formStudy.destroy();
            return res.json({ message: 'Form study deleted' });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async search(req, res, next) {
        try {
            const { query } = req.query;
            const formStudies = await Form_study.findAll({
                where: {
                    type: {
                        [Op.like]: `%${query}%`
                    }
                }
            });
            return res.json(formStudies);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new FormStudiesController();
