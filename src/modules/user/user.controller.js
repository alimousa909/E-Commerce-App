import { usermodel } from "../../../DataBase/models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendemilservice} from "../../services/sendEmails.js";
// ######## signUp ###########
export const  SignUp = async (req,res,next)=>{
    const {name,age,phone,e_maiel,password,DOB} = req.body
    const exist = await usermodel.findOne({name:name.tolowerCase()})
    if(exist){
        res.json({message:'new data please'})
    }
    const generateToken = jwt.sign({e_maiel},'alizzz')
    const confirmemiel =`${req.protcol}//${req.headers.host}:3000/users/confirmemiel/${generateToken}`
    const sended =sendemilservice(e_maiel,'confirm link')
    if(sended){

    }
    const hash = bcrypt.hashSync(password,8)
    const userObject ={name,age,phone,e_maiel,password,DOB}
    const createUser = await usermodel.crete(userObjects) 
}
// ######## confirm emiel ########
export const confirmmaiel = async (req,res,next)=>{
    const {token} = req.params
    if(!token){
        res.json({message:'invalid token'})
    }
    const decodeddata = jwt.verify(token,'tokenzzz')
    if(!decodeddata){
        res.json({message:'invalid token'})
    }
    const user = await usermodel.findOneAndUpdate({e_maiel:decodeddata.e_maiel,cofirmed:false},{confirmed:true},{new:true})
    if(!user){

    }
    res.stautus(200).json({message:'Done'})
}
// ######### Log In ########
export const login = async(req,res,next)=>{
    const {email,password} = req.body
    const User = await usermodel.findOne({email})
    if(!User){
        res.json({message:'invalid log in'})
    }
    const passMtch = bcrypt.compareSync(password,User.password)
    if(!passMtch){
        res.json({message:'invalid password '})
    }
    const userUpdated = await usermodel.findOneAndUpdate({email},{token,stautus:'online'},{new:true})
}
//=========== Forget Pass =========
export const forgetpass =  async (req,res,next)=>{
    const {email} =req.body
    const user = await usermodel.find({email:email.tolowerCase()})
    if(!user){
        res.json({message:'invalid token'})
    }
    let code = nanoid(4)
    let hashedcode =bcrypt.hashSync(code,+process.env.hashed_numbers)
    const token = jwt.sign({email:user.email,code:hashedcode})
    const resetpasslink = `${req.protcol}://${req.headers.host}/auth/reset/${token}`
    const sended  = sendemilservice(user.email,'reset pass')
    if(!sended){

    }
    const userUpdated = await usermodel.findOneAndUpdate(
    {email},
    {
        forgetpass:hashedcode
    },
    {
        new:true
    },
    )
    res.json({message:"Done"})
    
}
export const resetPassa =  async (req,res,next)=>{
    const {email} =req.body
    const user = await usermodel.find({email:email.tolowerCase()})
    if(!user){
        res.json({message:'invalid token'})
    }
    let code = nanoid(4)
    let hashedcode =bcrypt.hashSync(code,+process.env.hashed_numbers)
    const token = jwt.sign({email:user.email,code:hashedcode})
    const resetpasslink = `${req.protcol}://${req.headers.host}/auth/reset/${token}`
    const sended  = sendemilservice(user.email,'reset pass')
    if(!sended){

    }
    const userUpdated = await usermodel.findOneAndUpdate(
    {email},
    {
        forgetpass:hashedcode
    },
    {
        new:true
    },
    )
    res.json({message:"Done"})
    
} 
export const gmiellog = async (req, res, next) => {
    const client = new OAuth2Client()
    const { tokenid } = req.body
    async function verify() {
      const ticket = await client.verifyIdToken({
        tokenid,
        audience: process.env.CLIENT_ID,  
      })
      const payload = ticket.getPayload()
      return payload
    }
    const { email_verified, email, name } = await verify()
    if (!email_verified) {
      return next(new Error('invalid email', { cause: 400 }))
    }
    const user = await userModel.findOne({ email, provider: 'GOOGLE' })
   
    if (user) {
      const token = generateToken({
        payload: {
          email,
          _id: user._id,
          role: user.role,
        },
        signature: process.env.SIGN_IN_TOKEN_SECRET,
        expiresIn: '1h',
      })
  
      const userUpdated = await userModel.findOneAndUpdate(
        { email },
        {
          token,
          status: 'Online',
        },
        {
          new: true,
        },
      )
      return res.status(200).json({ messge: 'Login done', userUpdated, token })
    }
  
    
    const userObject = {
      userName: name,
      email,
      password: nanoid(6),
      provider: 'GOOGLE',
      isConfirmed: true,
      phoneNumber: ' ',
      role: 'User',
    }
    const newUser = await userModel.create(userObject)
    const token = generateToken({
      payload: {
        email: newUser.email,
        _id: newUser._id,
        role: newUser.role,
      },
      signature: process.env.SIGN_IN_TOKEN_SECRET,
      expiresIn: '1h',
    })
    newUser.token = token
    newUser.status = 'Online'
    await newUser.save()
    res.status(200).json({ message: 'Verified', newUser })
  }
  