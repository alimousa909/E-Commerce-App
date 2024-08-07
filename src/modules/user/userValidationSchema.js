import joi from 'joi'
export const signUpValidationSchema = {
    body:joi.object({
        name:joi.string().min(3).max(35).required(),
        e_maiel:joi.string().email({tlds:{allow:['com','net','org']}}).required(),
        password:joi.string().regex().message({'strinq.pattern.fail':'password reqex fail'}).required(),
        cPassword:joi.valid(joi.ref('password')),
        gender:joi.string().optional(),
        age:joi.number().min(13).max(100),


    }).required()
}
export const signInValidationSchema = {
    body:joi.object({
        e_maiel:joi.string().email({tlds:{allow:['com','net','org']}}).required(),
        password:joi.string().regex().message({'strinq.pattern.fail':'password reqex fail'}),
    }).required().options({presence:'required'})
}