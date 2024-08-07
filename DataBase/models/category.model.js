import  {Schema,model} from "mongoose"
const categoryschema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
      },

    image:{secure_url:String,puplic_id:String},
    createdby:{
        type:Schema.Types.objectid,
        ref:'user',
        required:false,

    },
    updatedby:{
        type:Schema.Types.objectid,
        ref:'user',
        required:false,

    },


},
{timestamps:true})
export const categorymodel = model ('category',categoryschema)