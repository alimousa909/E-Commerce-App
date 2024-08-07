import {connectDB} from '../../DataBase/connection.js'
import * as routers from '../../index.routes.js'
import { gracefulShutdown } from 'node-schedule'
import { changeCouponStatus } from './cron.js'
import { globalResponse } from './errhandelr.js'


import cors from 'cors'

export const iniatapp =(app,express) =>{
const port = process.env.PORT || 5000
app.use(express.json())
connectDB()
app.use(cors())
app.use('/category',routers.categoryRouter)
app.use('/subcatgory',routers.subCategoryRouter)
app.use('/brand',routers.brandRouter)
app.use('/product',routers.productRouter)
app.use('/order',routers.OrderRouter)
app.use('/review',routers.ReviewRouter)
app.use('/user',routers.userRouter)
app.use('/cart',routers.cartRouter)

app.all('*', (req, res, next) => res.status(404).json({ message: '404 Not Found URL' }), )

changeCouponStatus()
gracefulShutdown()

app.use(globalResponse)
}