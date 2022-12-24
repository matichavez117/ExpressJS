// --> Middleware para manejar errores
// --> Para que detecte que es un middleware de tipo error debe tener si o si los 4 parametros
// --> (err, req, res, next)

// --> Funcion para hacer un log de los errores
function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
};

// --> Funcion para devolverle los errores al cliente
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
};

// --> Preguntamos si el error es de tipo boom
// --> Devolvemos el status y el json con los detalles
// --> Si no es de tipo boom, seguimos al proximo middleware
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload)
    } else {
        next(err);
    };
};

module.exports = { logErrors, errorHandler, boomErrorHandler }