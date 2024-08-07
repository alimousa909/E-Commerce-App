import { couponmodel } from "../../../DataBase/models/coupo.model.js"
import { orderModel } from "../../../DataBase/models/order.model.js"
import { productmodel } from "../../../DataBase/models/product.model.js"
import { isCouponValid } from "../../utils/couponValidation.js"
import { cartmodel } from "../../../DataBase/models/cart.model.js"
import createInvoice from '../../utils/pdfkit.js'
import { sendemilservice } from "../../services/sendEmails.js"
import { paymentFunction } from "../../utils/payment.js"
import Stripe from "stripe"
export const add_order = async (req,res,next)=>{
    const userId = req.authuser._id
    const {productId,quantity,address,phoneNumber,paymentMethod,couponCode} = req.body
    if(couponCode){
        const coupon = await couponmodel.findOne({couponCode}).select ('isPercentge isFixedamount couponAmount couponAssignedToUsers')
        const isCouponValidorNot = isCouponValid({couponCode,userId,next})
        if(isCouponValidorNot !== true){
            return isCouponValidorNot
        }
        req.coupon = coupon
    }
    // products check 
    const products = []
    const isProductVlaid = await productmodel.findOne({_id},{quantity:{$gte:quantity}})
    if(!isProductVlaid){}
    const productObject ={
        productId,
        quantity,
        title:isProductVlaid.title,
        price:isProductVlaid.price,
        finalPrice:isProductVlaid.priceAfterDiscount*quantity
    }
    products.push(productObject)
    let subtotal = productObject.finalPrice
    if(req.coupon?.isFixedAmount && req.coupon.couponAmount > priceAfterDiscount){
        return res.json({Message:'pleaase select another product'})
    }

    const paidAmount =0
    if(req.coupon?.isPercentge){
     //   paidAmount =subtotal *
    }else if(req.coupon?.isFixedAmount){
        paidAmount =subtotal -req.coupon.couponAmount
    }else {
        paidAmount = subtotal
    }
    let orderStatus
    paymentMethod == 'Cash' ? (orderStatus = 'placed') :( orderStatus ='pending')
    
    const orderobject ={
        userId,
        products,
        address,
        phoneNumber,
        orderStatus,
        paymentMethod,
        subtotal,
        paidAmount,
        couponId:req.coupon?._id
    }
    const orderDb = await orderModel.create(orderobject)

    if(!orderDb){

    }
    // =========== payment ========
    let OrderSession
    if(orderDb.paymentMethod == 'card'){
        if(req.coupon){
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
            let coupon
            // coupon => perecentge
            if(req.coupon.isPercentge){
                coupon = await stripe.coupons.create({
                    percent_off:req.coupon.couponAmount,
                })
            }
            // coupon => fixedAmount
            if(req.coupon.isFixedAmount){
                coupon= await stripe.coupons.create({
                    amount_off:req.coupon.couponAmount * 100,
                    currency:'EGP',
                })
            }
        }
        const token = generateToken({
            payload:{orderId:orderDb._id},
            signature:process.env.ORDER_TOKEN,
            expiresIn:'1h',
        })
        OrderSession = await paymentFunction({
            payment_method_types:['card'],
mode:'payment',
customer_email :req.authuser.emil,
metadata :{orderId:orderDb._id.toString()},
success_url:`${req.portcol}://${req.header.host}/order/succesOrder?token=${token}`,
cancel_url:`${req.portcol}://${req.header.host}/order/CancelOrder?token=${token}`,
discounts:[],
line_items:orderDb.products.map((ele)=>{
    return {
        price_data:{
            currency:'EGP',
            product_data:{
                name:ele.title
            },
            unit_amount:ele.price * 100
        },
        quantity:ele.quantity,
    }
}),
        })
    }
            if(req.coupon){
        for (const user of req.coupon.couponAssignedToUsers){
            if(user.userId.toString() == userId.toString()){
                user.usageCount +=1
            }
            await req.coupon.save()
        }
    }

        await productmodel.findOneAndUpdate({_id:productId},{$inc:{stock:-parseInt(quantity)}})
        //==================== invoice ==================
        const orderCode = `${req.authuser.userName}_${nanoid(3)}`
        //==== generate invoice object=====
        const orderInvoice = {
            shipping :{
                name:req.authuser.userName,
                address:orderDb.address,
                city:'cairo',
                state:'cairo',
                country:'Egypt',
            },
            orderCode,
            subtotal:orderDb.subtotal,
            paidAmount:orderDb.paidAmount,
            items:orderDb.products,
            date:orderDb.createdAt,
        }
        await createInvoice(orderInvoice,`${orderCode}.pdf`)
        await sendemilservice({
            to:req.authuser.emil,
            subject:'Order Confirmation',
            message:'<h1>plese find your invoice pdf  <h1/>',
            attachments:{
               path: `${orderCode}.pdf`,
            }
})
        res.json({message:'Done'})
        
}
export const fromCartToOrder = async (req,res,next)=>{
  const userId = req.userId._id
  const {cartId} =  req.queryconst 
  const {address,phoneNumberNumber,paymentMethod,couponCode} = req.body
  const cart = await cartmodel.findById(cartId)
  if(!cart || !cart.products.length){

  }
  if(couponCode){
    const coupon = await couponmodel.findOne({couponCode}).select ('isPercentge isFixedamount couponAmount couponAssignedToUsers')
    const isCouponValidorNot = isCouponValid({couponCode,userId,next})
    if(isCouponValidorNot !== true){
        return isCouponValidorNot
    }
    req.coupon = coupon
}
let subtotal = cart.subtotal
let paidAmount =0
if(req.coupon?.isPercentge){
 //   paidAmount =subtotal *
}else if(req.coupon?.isFixedAmount){
    paidAmount =subtotal -req.coupon.couponAmount
}else {
    paidAmount = subtotal
}
let orderStatus
paymentMethod == 'Cash' ? (orderStatus = 'placed') :( orderStatus ='pending')
let orderProduct = []
  for (const product of cart.products) {
    const productExist = await productModel.findById(product.productId)
    orderProduct.push({
      productId: product.productId,
      quantity: product.quantity,
      title: productExist.title,
      price: productExist.priceAfterDiscount,
      finalPrice: productExist.priceAfterDiscount * product.quantity,
    })
  }
  const orderobject ={
    userId,
    products,
    address,
    phoneNumber,
    orderStatus,
    paymentMethod,
    subtotal,
    paidAmount,
    couponId:req.coupon?._id
}
const orderDb = await orderModel.create(orderobject)

    if(orderDb){
        if(req.coupon){
        for (const user of req.coupon.couponAssignedToUsers){
            if(user.userId.toString() == userId.toString()){
                user.usageCount +=1
            }
            await req.coupon.save()
        }
    }

}
await productmodel.findOneAndUpdate({_id:productId},{$inc:{stock:-parseInt(quantity)}})
}
export const succesPayment = async (req,res,next)=>{
    const {token} = req.query
    const decodeddata = verifyToken({token,signature:process.env.ORDER_TOKEN})
    const order = await orderModel.findOne({
        _id:decodeddata.orderId,
        orderStatus:'pending'
    })
    if(!order){
        return next (new Error('invlid order id'),{cause:400})

    }
    order.orderStatus = 'confirmed'
    await order.save()
    res.status(200).josn({message:'your order is confirmed'})
}
export const cancelPayment = async (req,res,next)=>{
    const {token} = req.query
    const decodeddata = verifyToken({token,signature:process.env.ORDER_TOKEN})
    const order = await orderModel.findOne({
        _id:decodeddata.orderId,
        orderStatus:'pending'
    })
    if(!order){
        return next (new Error('invlid order id'),{cause:400})

    }
    order.orderStatus = 'canceld'
    await order.save()
    for(const product of order.products){
        await productmodel.findByIdAndUpdate(product.productId,{
            $inc:{stock:parseInt(product.quantity)}
        })
    }
    if(order.couponId){
        const coupon = await couponmodel.findById(order.couponId)
        if(!coupon){
            return next (new Error('this coupon is deleted'))
        }
        coupon.couponAssignedToUsers.map((ele)=>{
            if(ele.userId.toString() == order.userId.toString()){
                ele.usageCount -=1
            }
        })
        await coupon.save()
    }
    res.status(200).josn({message:'your order is canceld'})
}
 
export const deliverOrder = async (req,res,next)=>{
    const {orderId} = req.query
    const order = await orderModel.findOneAndUpdate(
        {
            _id:orderId,
            orderStauts:{$nin:['pending', 'rejected' ,'deliverd','canceld']}
        },
        {
            orderStauts:'deliverd'
        },
        {
            new:true
        }
    )
    if(!order){
        return next (new Error('invlid'))
    }
    res.status(201).json({message:'Done'})
}