const typesConceptsController = require("../controllers/typesConceptsController");
const passport = require('passport');

module.exports = (app, upload) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // 401 UNAUTHORIZED
    app.get('/api/typesconcepts', passport.authenticate('jwt', {session: false}), typesConceptsController.getAllTypesConcepts);
    app.get('/api/typesconcepts/typesconceptsbyid/:id', passport.authenticate('jwt', {session: false}), typesConceptsController.getTypeConceptById);
    app.post('/api/typesconcepts/create', passport.authenticate('jwt', {session: false}), typesConceptsController.createTypeConcept);
    app.put('/api/typesconcepts/update/:id', passport.authenticate('jwt', {session: false}), typesConceptsController.updateTypeConcept);
    app.delete('/api/typesconcepts/delete/:id', passport.authenticate('jwt', {session: false}), typesConceptsController.deleteTypeConcept);
}