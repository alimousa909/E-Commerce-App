import {Router} from 'express'
const router =Router()
import * as oo from './order.controller.js'
import { asynchandelr } from '../../utils/errhandelr.js'
import {isAuth} from '../../middlewares/Auth.js'
import * as validator from './order.validation.js'
import { systemRoles } from '../../utils/systemRoles.js'
import { validationFunction } from '../../middlewares/validation.js'
router.post('/',isAuth(systemRoles.USER),validationFunction(validator.createOrderSchema),asynchandelr(oo.add_order))
router.post('/cartorder',isAuth(systemRoles.USER),validationFunction(validator.createOrderSchema),asynchandelr(oo.fromCartToOrder))
router.patch('/cancel',asynchandelr(oo.cancelPayment))
router.get('/succes',asynchandelr(oo.succesPayment))
router.post('/deliver',isAuth(systemRoles.ADMIN),asynchandelr(oo.deliverOrder))
export default Router