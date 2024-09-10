const scrapingController = require('../controllers/scrapingController');
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/indicadoresprevired', passport.authenticate('jwt', {session: false}), scrapingController.getValoresPrevired);
}