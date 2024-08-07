import mongoose from 'mongoose';

export const connectDB = async ()=>{
    return await mongoose.connect(process.env.connection_url_database)
    .then((res)=>console.log("Succesful connect"))
    .catch((err)=>console.log("fail to connect data base",err))
}