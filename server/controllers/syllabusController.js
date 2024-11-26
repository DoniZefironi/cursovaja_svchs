const uuid = require('uuid');
const path = require('path');
const { Syllabus } = require('../models/models');
const ApiError = require('../error/ApiError');

class SyllabusController {
    async create(req, res, next) {
        try {
            const { date } = req.body;
            const { syllfile } = req.files;

            if (!syllfile) {
                return next(ApiError.badRequest('No file uploaded'));
            }

            let fileName = uuid.v4() + path.extname(syllfile.name);
            let filePath = path.resolve(__dirname, '..', 'static', fileName);

            syllfile.mv(filePath, (err) => {
                if (err) {
                    return next(ApiError.internal('File upload failed'));
                }
            });

            const syllabus = await Syllabus.create({ date, syllfile: fileName });
            return res.json(syllabus);
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async getAll(req, res) {
        const syllabus = await Syllabus.findAll();
        return res.json(syllabus);
    }

    async getOne(req, res) {

    }

    async deleteOne(req, res) {

    }
}

module.exports = new SyllabusController();