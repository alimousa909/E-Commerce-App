import {Schema,model}from "mongoose";
const brandSchema =new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    logo:{secure_url:String,puplic_id:String},
    addedby:{
        type:Schema.Types.objectid,
        ref:'user',
        required:false,
    },
    categoryid:{
        type:Schema.Types.objectid,
        ref:'category',
        required:false,
    },
    subcategoryid:{
        type:Schema.Types.objectid,
        ref:'category',
        required:false,
    }

},
{timestamps:true})
export const brandmodel =model('brand',brandSchema)