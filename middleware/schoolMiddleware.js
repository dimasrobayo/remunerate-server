const dbSchool = require('../db');

async function schoolMiddleware(request, response, next) {
    try {
        const { dbSchool_name } = request.dbInfo;

        await dbSchool.connect(dbSchool_name);
        next();
    } catch (err) {
        console.error('Error connecting to tenant database', err);
        return response.status(500).json({ error: 'Error en el servidor' });
    }
}

module.exports = schoolMiddleware;