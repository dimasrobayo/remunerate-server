const remunerationBookRoutes = require('./remunerationBookRoutes');
const utilsRoutes = require('./utilsRoutes');
const userRoutes = require('./useRoutes');
const companiesRoutes = require('./companiesRoutes');
const listsRoutes = require('./listsRoutes');
const typesConceptsRoutes = require('./typesConceptsRoutes');
const internarCategoriesRoutes = require('./internalCategoriesRoutes');
const institutionsTypesRoutes = require('./institutionsTypesRoutes');
const institutionsRoutes = require('./institutionsRoutes');
const conceptsRoutes = require('./conceptsRoutes');
const employeesRoutes = require('./employeesRoutes');
const contractsRoutes = require('./contractsRoutes');
const templatesRoutes = require('./templatesRoutes');

module.exports = (app, upload) => {
    userRoutes(app, upload);
    remunerationBookRoutes(app);
    typesConceptsRoutes(app);
    internarCategoriesRoutes(app);
    institutionsTypesRoutes(app);
    institutionsRoutes(app);
    companiesRoutes(app);
    listsRoutes(app);
    utilsRoutes(app);
    conceptsRoutes(app);
    employeesRoutes(app);
    contractsRoutes(app);
    templatesRoutes(app);
};