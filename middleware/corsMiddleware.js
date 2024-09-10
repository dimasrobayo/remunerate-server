// middleware/corsMiddleware.js
const corsMiddleware = (req, res, next) => {
    const allowedOrigins = req.dbInfo ? req.dbInfo.domain : [];
    const origin = req.headers.origin;

    // Verificar si el origen está en la lista de permitidos
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Configurar los encabezados de CORS
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    // Manejo de solicitudes preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
};

module.exports = corsMiddleware;
