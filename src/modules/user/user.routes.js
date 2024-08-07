import {Router} from 'express'
import { validationFunction } from '../../middlewares/validation'
import { signInValidationSchema, signUpValidationSchema } from './userValidationSchema'
import * as uc from './user.controller'
import { asynchandelr } from '../../utils/errhandelr'
const router =Router()

router.post('/signUp',validationFunction(signUpValidationSchema),asynchandelr(uc.SignUp))
router.get('/confirm:/token',asynchandelr(uc.confirmmaiel))
router.post('/SignIn',validationFunction(signInValidationSchema),asynchandelr(uc.login))
router.post('/forgetpass',asynchandelr(uc.forgetpass))
router.post('/resetpassword',asynchandelr(uc.resetPassa))
export default Router