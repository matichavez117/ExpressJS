const boom = require('@hapi/boom');

// --> Funcion de middleware tipo validator
// --> Guarda las propiedades del request en data
// --> Le dice al squema que se valide y le pasa las propiedades al validate
// --> Si hay un error manda un badRequest tipo boom y lo manda por next para que lo tomen los middlewares tipo error
// --> Si no hay error que siga con los siguientes middlewares
function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        } else {
            next();
        };
    };
};

module.exports = validatorHandler;