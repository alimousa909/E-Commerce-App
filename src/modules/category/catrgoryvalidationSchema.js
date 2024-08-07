import Joi, { string } from "joi";

export const newcatValidationSchema ={
    body:Joi.object({
        name:string().min(3).max(20),
    }).required()
}
export const updateValidtionSchema ={
    body:Joi.object({
        name:string().min(3).max(20),
    }).required()
}