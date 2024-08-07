import {Router} from 'express'
const router =Router()
import * as c from '../category/category.controller.js'
import { categoryApiRoles } from './category.endpoints.js'
import {asyncHandler} from '../../utils/errhandelr.js'
import {isAuth} from '../../middlewares/Auth.js'
router.use('/:categoryId', subCategoryRouter)

router.post(
  '/',
  isAuth(categoryApiRoles.CREATE_CATEGORY),
  multerCloudFunction(allowedExtensions.Image).single('image'),
  validationCoreFunction(validators.createCategorySchema),
  asyncHandler(c.NewCategory),
)

router.put(
  '/:categoryId',
  isAuth(
    categoryApiRoles.UPDATE_CATEGORY),
  multerCloudFunction(allowedExtensions.Image).single('image'),
  validationCoreFunction(validators.updateCategorySchema),
  asyncHandler(c.updatecategory),
)

router.get('/getall',asyncHandler(c.getallCategories))

 

router.delete(
  '/',
  isAuth(),
  asyncHandler(c.deletecategory))

export default Router