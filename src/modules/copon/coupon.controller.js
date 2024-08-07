import { couponmodel } from "../../../DataBase/models/coupo.model.js";
import { usermodel } from "../../../DataBase/models/user.model.js";

export const CreateCoupon = async (req,res,next) =>{
    const {couponCode,couponAmount,isPercentge,isFixedamount,fromDate,toDate,couponStatus} = req.body
     const coupon = await couponmodel.find({couponCode})
     if(coupon){
       return next (new Error('duplicate name'))
     }
     if((!isFixedamount && !isPercentge) || (isFixedamount && isPercentge)){
      return next (new Error('please select if the coupon percentge or fixed amount'))
     }
     let usersId =[]
     for(const user of couponAssignedToUsers){
      usersId.push(user.userId)
     }
     const userCheck = await usermodel.find({_id:{$in:usersId}})
     if(usersId.length !== userCheck.length){
      return next (new Error('invalid user id\'s'))
     }
     const ObjectCoupon ={couponCode,couponAmount,isPercentge,isFixedamount,fromDate,toDate,couponStatus}
     const AddCoupon = await couponmodel.create(ObjectCoupons)
     if(!ObjectCoupon){
      res.json({message:"fail to add coupon"})
     }

}
export const deleteCoupon = async (req,res,next)=>{
   const {_id} = req.params
   const userId = req.authUser._id
   const iscouponcodedublicated = await couponmodel.findOneAndDelete({_id,createdBy:userId})
   if(!iscouponcodedublicated){
      res.json({message:'deleted done'})
   }
}