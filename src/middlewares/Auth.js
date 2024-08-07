import { usermodel } from "../../DataBase/models/user.model.js"
import jwt from 'jsonwebtoken'

const Auth = ()=>{
    return  async (req,res,next)=>{
        const {authorization} = req.headers
        if (!authorization){
            return res.json({message:'please login first'})
        }
        if(!authorization.startsWith('saraha')){
            return res.json({message:'invalid token'})
        }
        const splitedtoken = authorization.split('')[1]
        const decodeddata = jwt.verify(splitedtoken,+process.env.tokenSignature)
        if(!decodeddata || !decodeddata._id){
           return res.json({message:'invalid token'})
        }
        const finduser = await usermodel.findById(decodeddata._id)
        if(!finduser){
            return res.json({message:'invalid token'})
        }
        req.authUser = finduser
        next()
}
}