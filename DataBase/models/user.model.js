import  {Schema,model} from "mongoose";
import { systemRoles } from "../../src/utils/systemRoles";
const userschema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,

    },
    age:{
        type:Number,
        required:true,
        enum:['male','female']
    },
    Role:{
        type:String,
        enum:[systemRoles.USER,systemRoles.ADMIN,systemRoles.SUPER_ADMIN]

    },
    phone:{
        type:String,
        required:true,
        //enum:[0,1,2,3,4,5,6,7,8,9]

    },
    e_maiel:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    isConfirmed:{
        type:Boolean,
        default:false
    },
    Blocked:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        default:'online',
        enum:['online','offline']

    },
    DOB:{
       type:String,
       required:true, 

    },
    image:{secure_url:String,puplic_url:String}
},
{timestambs:true})
export const usermodel = model('user',userschema)