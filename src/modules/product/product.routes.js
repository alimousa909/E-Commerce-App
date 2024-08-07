import {Router} from 'express'
const router =Router()
import * as product from './product.controller.js'
 
import { asynchandelr } from '../../utils/errhandelr.js'
import { multerCloudFunction } from '../../services/multerCloud.js'
import { validationFunction } from '../../middlewares/validation.js'
import { allowedExtensions } from '../../utils/allowedExtensios.js'
import * as valid from './product.validationSchema.js'

router.post('/create',multerCloudFunction(allowedExtensions.Image).array('image',3),validationFunction(valid.addproductSchema),asynchandelr(product.create_product))
router.get('/getall',asynchandelr(product.getAllProducts))
router.get('/list',asynchandelr(product.listallproducts))
router.delete('/delete',asynchandelr(product.deleteProducts))
router.put('/update',multerCloudFunction(allowedExtensions.Image).array('image',3),validationFunction(valid.updateProdcutSchema),asynchandelr(product.update_product))
export default Router