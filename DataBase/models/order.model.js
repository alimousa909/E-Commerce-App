import {Schema,model} from 'mongoose'
const orderSchmea = new Schema ({
    userId:{
        type:Types.ObjectId,
        ref:'user',
        required : false,
    },
    products:[{
        productId:{
            type:Types.ObjectId,
            ref:'user',
            required:false,
        },
        quantity:{
            type:Number,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        finalprice:{
            type:Number,
            required:true,
        }
    }],
    subtotal:{
        type:Number,
        required:false,
    },
    CouponId:{
        type:String,
        required:false,
    },
    paidAmount:{
        type:Number,
        required:false,
    },
    addres:{
        type:String,
        required:true,
    },
    phoneNumber:[{type:String,required:true}],
    orderStauts:{
        types:String,
        enum:['pending','confirmed','placed','prepraition','on way','deliverd','canceld','rejected']
    },
    paymentMethods:{
        type:String,
        enum:['cash','card']
    },
    updatedBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    canceldBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
    },
    Reson:String

},{timestamps:true})

export const orderModel = model ('order',orderSchmea)