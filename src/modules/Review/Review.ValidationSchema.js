import Joi, { number, string } from "joi";

export const ReviewValidtionScheama = {
    body:Joi.object({
        reviewComment:Joi.string().min(1).max(255).optional(),
        reviewRate:Joi.number().min(1).max(5),
    })
}