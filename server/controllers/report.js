const { User_methodological, User, Methodological_rec } = require('../models/models');
const ApiError = require('../error/ApiError');

class ReportController {
    async generateUserReport(req, res, next) {
        try {
            const { userId } = req.params; // Получаем ID пользователя из параметров запроса

            // Получаем методички для указанного пользователя
            const userMethodologicals = await User_methodological.findAll({
                where: { userId },
                include: [
                    { model: User, attributes: ['id', 'name', 'surname'] },
                    { model: Methodological_rec, attributes: ['id', 'title'] }
                ]
            });

            if (!userMethodologicals.length) {
                return next(ApiError.notFound('No methodical records found for this user'));
            }

            // Формируем данные для отчета
            const user = userMethodologicals[0].User; // Получаем данные пользователя
            const reportData = userMethodologicals.map(item => ({
                methodologicalId: item.methodologicalRecId,
                title: item.Methodological_rec.title,
            }));

            // Возвращаем данные для генерации отчета
            return res.json({ user, reportData });
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new ReportController();