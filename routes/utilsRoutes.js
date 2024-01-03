const utilsController = require("../controllers/utilsController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/utils/getRegions', passport.authenticate('jwt', {session: false}), utilsController.getRegions);
    app.get('/api/utils/communityByRegions/:id', passport.authenticate('jwt', {session: false}), utilsController.communityByRegions);
    app.get('/api/utils/getCountries', passport.authenticate('jwt', {session: false}), utilsController.getCountries);
}