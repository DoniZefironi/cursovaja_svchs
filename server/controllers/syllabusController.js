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
        const {id} = req.query
        if (!id){
            return next(ApiError.bodRequest('Не задан ID'))
        }
        res.json(id);
    }

    async deleteOne(req, res) {
        const { id } = req.params;
        
        try {
            const syllabus = await Syllabus.findByPk(id);
            if (!syllabus) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            await syllabus.destroy();
            return res.json({ message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
    }
}

module.exports = new SyllabusController();