const companiesController = require("../controllers/companiesController");
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    // 401 UNAUTHORIZED
    app.get('/api/companies', passport.authenticate('jwt', {session: false}), companiesController.index);
    app.get('/api/companies/companybyid/:id', passport.authenticate('jwt', {session: false}), companiesController.getCompanybyid);
    app.post('/api/companies/create', passport.authenticate('jwt', {session: false}), companiesController.create);
    app.put('/api/companies/update/:id', passport.authenticate('jwt', {session: false}), companiesController.update);
    app.delete('/api/companies/delete/:id', passport.authenticate('jwt', {session: false}), companiesController.softDelete);
}