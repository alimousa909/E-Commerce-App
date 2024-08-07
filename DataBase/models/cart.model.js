import {Schema,model} from 'mongoose'
const cartSchema = new Schema ({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    products:[{
        productid:{
            type:Schema.Types.ObjectId,
            ref:'product',
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
        }
    }],
    subtotal:{
        type:Number,
        required:true,
    },
},{timestamps:true})

export const cartmodel = model('cart',cartSchema)