const utilsRoutes = require('./utilsRoutes');
const userRoutes = require('./useRoutes');
const companiesRoutes = require('./companiesRoutes');
const listsRoutes = require('./listsRoutes');
const typesConceptsRoutes = require('./typesConceptsRoutes');
const internarCategoriesRoutes = require('./internalCategoriesRoutes');
const institutionsTypesRoutes = require('./institutionsTypesRoutes');
const institutionsRoutes = require('./institutionsRoutes');
const remunerationBookRoutes = require('./remunerationBookRoutes');
const conceptsRoutes = require('./conceptsRoutes');
const employeesRoutes = require('./employeesRoutes');

module.exports = (app, upload) => {
    utilsRoutes(app);
    userRoutes(app, upload);
    typesConceptsRoutes(app);
    internarCategoriesRoutes(app);
    institutionsTypesRoutes(app);
    institutionsRoutes(app);
    listsRoutes(app);
    companiesRoutes(app);
    remunerationBookRoutes(app);
    conceptsRoutes(app);
    employeesRoutes(app);
};