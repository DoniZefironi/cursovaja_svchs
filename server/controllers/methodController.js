const {Methodological_rec} = require('../models/models')
const ApiError = require('../error/ApiError')

class MethodController {
    async create(req, res) {
        const { title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId } = req.body;
        const met = await Methodological_rec.create({title, description, language, year_create, url, quantity_pages, subjectId, TypeMethodId});
        return res.json(met);
    }

    async getAll(req, res) {
        
    }

    async getOne(req, res) {
        
    }

    async deleteOne(req, res) {
        
    }
}

module.exports = new MethodController()