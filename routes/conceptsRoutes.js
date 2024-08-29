const conceptsController = require("../controllers/ConceptsController");
const passport = require('passport');

module.exports = (app) => {
    // Rutas para concepts
    app.get('/api/concepts', passport.authenticate('jwt', { session: false }), conceptsController.getAllConcepts);
    app.get('/api/concepts/list', passport.authenticate('jwt', { session: false }), conceptsController.listConcepts);
    app.get('/api/concepts/listbyid/:id', passport.authenticate('jwt', { session: false }), conceptsController.getConceptById);
    app.post('/api/concepts/create', passport.authenticate('jwt', { session: false }), conceptsController.createConcept);
    app.put('/api/concepts/update/:id', passport.authenticate('jwt', { session: false }), conceptsController.updateConcept);
    app.delete('/api/concepts/delete/:id', passport.authenticate('jwt', { session: false }), conceptsController.deleteConcept);

    // Rutas para attributes
    app.get('/api/attributes', passport.authenticate('jwt', { session: false }), conceptsController.getAllAttributes);
    app.get('/api/attributes/:id', passport.authenticate('jwt', { session: false }), conceptsController.getAttributeById);
    app.post('/api/attributes/create', passport.authenticate('jwt', { session: false }), conceptsController.createAttribute);
    app.put('/api/attributes/:id', passport.authenticate('jwt', { session: false }), conceptsController.updateAttribute);
    app.delete('/api/attributes/:id', passport.authenticate('jwt', { session: false }), conceptsController.deleteAttribute);
};
