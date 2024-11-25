const uuid = require('uuid')
const path = require('path')
const {Syllabus} = require('../models/models')
const ApiError = require('../error/ApiError')

class SyllabusController {
    async create(req, res) {
        const { date } = req.body;
        const { syllfile } = req.files
        let fileName = uuid.v4() + ".pdf"
        syllfile.mv(path.resolve(__dirname, '..', 'static', fileName))
        const syllabus = await Syllabus.create({date, syllfile: fileName});
        return res.json(syllabus);
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

    async deleteOne(req, res) {
        
    }
}

module.exports = new SyllabusController()