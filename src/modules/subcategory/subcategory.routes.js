import {Router} from 'express'
const router =Router()
import { asynchandelr } from '../../utils/errhandelr.js'
import { validationFunction } from '../../middlewares/validation.js'
import { SubCategorySchema, updateSubCategory } from './subcategoryvalidationSchema.js'
import * as sub from '../subcategory/subcategory.controller.js'
import { multerCloudFunction } from '../../services/multerCloud.js'
import { allowedExtensions } from '../../utils/allowedExtensios.js'
router.post('/',multerCloudFunction(allowedExtensions.Image).array('image'),validationFunction(SubCategorySchema),asynchandelr(sub.createSubcategory))
router.post('/update',multerCloudFunction(allowedExtensions.Image).array('image'),validationFunction(updateSubCategory),asynchandelr(sub.updateSubCategory))
router.delete('/del',asynchandelr(sub.RemoveSubcategory))
router.get('/',asynchandelr(sub.getAllsubcategories))
export default Router