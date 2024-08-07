import {scheduleJob} from 'node-schedule'
import {couponModel} from '../../DataBase/models/coupo.model.js'
export const changeCouponStatus =    ()=>{
    scheduleJob('* * * * * *',async function(){
        const validateCoupon = await couponModel.find({couponStatus:'Valid'})
        for(const coupon of validateCoupon){
            if (moment(coupon.toDate).isBefore(moment().tz('Africa/Cairo'))) {
                coupon.couponStatus = 'Expired'
              }
              await coupon.save()
        }
        console.log('cron stauts is run')
    })
}