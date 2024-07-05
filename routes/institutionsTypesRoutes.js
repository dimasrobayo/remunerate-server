const institutionsTypesController = require("../controllers/institutionsTypesController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/institutionstypes', passport.authenticate('jwt', {session: false}), institutionsTypesController.getAllInstitutionsTypes);
    app.post('/api/institutionstypes/create', passport.authenticate('jwt', {session: false}), institutionsTypesController.createInstitutionType);
    app.put('/api/institutionstypes/update', passport.authenticate('jwt', {session: false}), institutionsTypesController.updateInstitutionType);
    app.delete('/api/institutionstypes/delete', passport.authenticate('jwt', {session: false}), institutionsTypesController.deleteInstitutionType);
}