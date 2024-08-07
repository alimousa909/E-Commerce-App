import {Router} from 'express'
const router =Router()
import * as cart from './cart.controller.js'
import { asynchandelr } from '../../utils/errhandelr.js'
import {isAuth} from '../../middlewares/Auth.js'
import { systemRoles } from '../../utils/systemRoles'
router.post('/add',isAuth([systemRoles.USER]),asynchandelr(cart.addtoCaert))
router.delete('/delete',isAuth([systemRoles.USER]),asynchandelr(cart.deletefromCart))
export default Router