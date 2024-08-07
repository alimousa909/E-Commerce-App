import {Router} from 'express'
const router =Router()
import * as br from './brand.controller.js'
import { asynchandelr } from '../../utils/errhandelr.js'
import { allowedExtensions } from '../utils/allowedExtensions.js'
import {multerCloudFunction} from '../../services/multerCloud.js'
 router.post('/add',multerCloudFunction(allowedExtensions.Image).single('logo'),asynchandelr(br.createbrand))
 router.get('update',asynchandelr(br.updateBrand))
 router.post('delete',asynchandelr(br.delete_brand))
export default Router