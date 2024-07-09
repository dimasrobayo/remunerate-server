const utilsRoutes = require('./utilsRoutes');
const userRoutes = require('./useRoutes');
const companiesRoutes = require('./companiesRoutes');
const mutualRoutes = require('./mutualRoutes');
const cajaCompensacionRoutes = require('./cajaCompensacionRoutes');
const listsRoutes = require('./listsRoutes');
const typesConceptsRoutes = require('./typesConceptsRoutes');
const internarCategoriesRoutes = require('./internalCategoriesRoutes');
const institutionsTypesRoutes = require('./institutionsTypesRoutes');
const institutionsRoutes = require('./institutionsRoutes');

module.exports = (app, upload) => {
    utilsRoutes(app);
    userRoutes(app, upload);
    mutualRoutes(app);
    cajaCompensacionRoutes(app);
    companiesRoutes(app);
    listsRoutes(app);
    typesConceptsRoutes(app);
    internarCategoriesRoutes(app);
    institutionsTypesRoutes(app);
    institutionsRoutes(app);
};