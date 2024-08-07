import {Schema,model} from "mongoose"
const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    slug:{

    },
    price:{
        type:Number,
        required:true,
    },
    priceafterDiscount:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    colour:{
        type:String,
        required:true,
    },
    rate: {
        type: Number,
        default: 0,
        required: true,
      },
    size:{
        type:String,
        required:false,
    },
    image:{secure_url:String,puplic_id:String},
    coverImage:{secure_url:String,puplic_id:String},

},{timestamps:true,
toJSON:{virtuals:true},
toObject:{virtuals:true}}) 

productSchema.virtual('Review',{
    ref:'Review',
    foreignField:'productId',
    localField:'_id'
})
export const productmodel =model('product',productSchema)