import {Schema,mode} from 'mongoose'
const couponSchema =new Schema ({
    couponCode:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    couponAmount:{
        type:Number,
        required:true,
        min:1,
        default:1,
        max:100,
    },
    isPercentge:{
        type:Boolean,
        required:true,
        default:false,
    },
    isFixedamount:{
        type:Boolean,
        required:true,
        default:false,
    },
    createdBy:{
        type:Schema.Types.objectid,
        ref:'user',
        required:false,
    },
    updatedBy:{
        type:Schema.Types.objectid,
        ref:'user',
    },
    deletedBy:{
        type:Schema.Types.objectid,
        ref:'user',
    },
    couponAssignedToUsers:[{
        userId:{
            type:Schema.Types.objectid,
            ref:'user',
        },
        maxusage:{
            type:Number,
            required:true,
          /*  default:1,
            min:1,
            max:100,*/
        },
        usageCount:{
            type:Number,
            default:0,
        }
      
    }],
    fromDate:{
        type:String,
        required:true,

    },
    toDate:{
        type:String,
        required:true,

    },
    couponStatus:{
        type:String,
        required:true,
        enum:['Expired','Valid'],
        default:'valid',

    }

},
{timestamps:true})

export const couponmodel = model('coupon',couponSchema)