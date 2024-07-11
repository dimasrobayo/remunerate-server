const institutionsController = require("../controllers/institutionsController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/institutions', passport.authenticate('jwt', {session: false}), institutionsController.getAllInstitutions);
    app.get('/api/institutions/institutionsbyid/:id', passport.authenticate('jwt', {session: false}), institutionsController.getInstitutionById);
    app.get('/api/institutions/listinstitutionsbycondition/:id', passport.authenticate('jwt', {session: false}), institutionsController.getListInstitutionsById);
    app.post('/api/institutions/create', passport.authenticate('jwt', {session: false}), institutionsController.createInstitution);
    app.put('/api/institutions/update/:id', passport.authenticate('jwt', {session: false}), institutionsController.updateInstitution);
    app.delete('/api/institutions/delete/:id', passport.authenticate('jwt', {session: false}), institutionsController.deleteInstitution);
}