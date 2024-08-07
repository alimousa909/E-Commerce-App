import  {Schema,model} from "mongoose"
const subcategorySchema=new Schema({
name:{
    type:String,
    required:true,

},
image:
    { secure_url:String, puplic_id:String },
    categoryid:{
        type:Schema.Types.objectid,
        ref:'category',
        required:false,
    },
    createdby:{
        type:Schema.Types.objectid,
        ref:'user',
        required:false,

    }

},{timestamps:true})
export const subcategorymodel = model('subcategory',subcategorySchema)