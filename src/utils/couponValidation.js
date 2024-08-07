import {couponmodel} from '../../DataBase/models/coupo.model.js'
// import moment form 'moment-timezone'
 export const  isCouponValid = async ({couponCode,userId,next}={}) =>{
    // find coupon
    const coupon = await couponmodel.find({couponCode})
    if(!coupon){
      return  next (new errpr ('invalid coupon'))
    }
    // expiration
    if(coupon.couponStatus == 'Expired'){
        return  next (new errpr ('coupon is expired'))
    }
    for (const user of coupon.couponAssignedToUsers){
        // coupon not assigned to user
        if(user.toString() !== user.userId.toString()){
            return  next (new errpr ('this user is not assigned to this coupon'))
        }
        // excedd the max usage
        if(user.maxUsage < user.UsageCount){
            return  next (new errpr ('exced the max usge for this coupon'))
        }
    }
    return true

 }
