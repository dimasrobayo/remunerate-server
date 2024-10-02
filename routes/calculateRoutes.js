const CalculateController = require("../controllers/CalculateController");
const passport = require('passport');

module.exports = (app) => {
    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS
    // 401 UNAUTHORIZED
    app.post('/api/calculateliquidation', passport.authenticate('jwt', {session: false}), CalculateController.liquidation);
}