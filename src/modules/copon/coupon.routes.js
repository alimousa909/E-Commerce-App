import {Router} from 'express'
const router =Router()
import * as coupon from './coupon.controller.js'
import { systemRoles } from '../../utils/systemRoles.js'
import { asynchandelr } from '../../utils/errhandelr.js'
import { validationFunction } from '../../middlewares/validation.js'
import { validationSchema } from './coupon.validationSchema.js'
router.post('/',isAuth([systemRoles.USER]),validationFunction(validationSchema),asynchandelr(coupon.CreateCoupon))
router.delete('/delete',isAuth([systemRoles.ADMIN],asynchandelr(coupon.deleteCoupon)))
export default Router