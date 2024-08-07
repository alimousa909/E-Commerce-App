import { orderModel } from "../../../DataBase/models/order.model.js"
import { productmodel } from "../../../DataBase/models/product.model.js"
import { reviewModel } from "../../../DataBase/models/review.model.js"

export const addReview = async (req,res,next)=>{
    const userId = req.authUser._id
    const {productId} = req.query
    //=========== check product ============
    const isProductValidToberecview = await orderModel.findOne({userId,
    'products.productId':productId,
    orderStatus:'deliverd'})
    if(!isProductValidToberecview){

    }
    const {reviewRate,reviewCommnet} = req.body
    const reviewObject ={
    userId,
    productId,
    reviewCommnet,
    reviewRate
}
const crearteReview = await reviewModel.create(reviewObject)
if(!crearteReview){
    res.json({messge:'fail'})
}
const product = await productmodel.findByItd(productId)
const review = await reviewModel.find({productId})
let sumofrates =0
for (const review of reviews ){
    sumofrates +=review.reviewRate
}
product.rate = Number(sumofrates/ review.length).toFixed(2)
await productmodel.save()
res.status(201).json({message:'Dones'})

}