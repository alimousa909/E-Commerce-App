import {Router} from 'express'
const router =Router()
import * as rev from './Review.controller.js'
import { ReviewValidtionScheama } from './Review.ValidationSchema.js'
import { reviewApi } from './Review.endPoints.js'
import { asynchandelr } from '../../utils/errhandelr.js'
import {isAuth} from '../../middlewares/Auth.js'
import { validationFunction } from '../../middlewares/validation.js'
router.post('/',isAuth(reviewApi.ADD_REVIEW),validationFunction(ReviewValidtionScheama),asynchandelr(rev.addReview))
export default Router