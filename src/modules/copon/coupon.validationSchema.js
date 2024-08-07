import Joi from 'joi'
export const validationSchema = {
    body:Joi.object({
        couponCode:Joi.string().min(3).max(55).required(),
        couponAmount:Joi.number().positive().min(1).max(100).required(),
        isPercentge:Joi.boolean().optional(),
        isFixedamount:Joi.boolean().optional(),
        fromDate:Joi.date().greater(Date.now()-(24*60*60*1000)).required(),
        toDate:Joi.date().greater(Joi.ref('fromDate')).required(),
    }).required(),
}