import Joi from "joi";
export const addproductSchema = {
    body:Joi.object({
        name:Joi.string().min(3).max(55).required(),
        desc:Joi.string().min().max(255).optional(),
        price:Joi.number().positive().min().required(),
        discount:Joi.number().positive().min().max().optional(),
        colors:Joi.array().items(Joi.string().required()).optional(),
        sizes:Joi.array().items(Joi.string().required()).optional(),
        stock:Joi.number().positive().min(1).required(),
    }).options({presence:'required'})
}
export const updateProdcutSchema = {
    body:Joi.object({
        name:Joi.string().min(3).max(55).required(),
        desc:Joi.string().min().max(255).optional(),
        price:Joi.number().positive().min().required(),
        discount:Joi.number().positive().min().max().optional(),
        colors:Joi.array().items(Joi.string().required()).optional(),
        sizes:Joi.array().items(Joi.string().required()).optional(),
        stock:Joi.number().positive().min(1).required(),
    }).options({presence:'required'})
}