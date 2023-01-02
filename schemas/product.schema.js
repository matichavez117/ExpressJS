const Joi = require('joi');

// Asignamos las conficiones para cada propiedad
const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(10);
const price = Joi.number().integer().min(10);

//C --> Creamos un esquema para cada tipo de peticion

// --> Esquema create
const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
})

// --> Esquema update
const updateProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
})

// --> Esquema get
const getProductSchema = Joi.object({
    id: id.required(),
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }