import { brandmodel } from "../../../DataBase/models/brand.model.js";
import { categorymodel } from "../../../DataBase/models/category.model.js";
import { subcategorymodel} from "../../../DataBase/models/subcategory.model.js";
import slugify from 'slugify'
import cloudinary from "../../utils/CloudinaryConfigration.js";
import {customAlphabet} from 'nanoid'
const nanoid= customAlphabet('12345%#@!0987',6)
//1-add brand
export const createbrand = async (req,res,next)=>{
    const {_id} =req.params
    const {name} = req.body
    const findcategory = await categorymodel.find({_id})
    const findsubcategory = await subcategorymodel.find({_id})

    if(!findcategory || !findsubcategory){
        next (new error ('invalid brnad'))
    }
    if(await brandmodel.find({name})){
        next (new error ('duplicate name'))
    }
    const slug =slugify(name,'_')

    if(!req.file){
        res.json({message:'please upload a photo'})
    }
    const {secure_url,puplic_id} = cloudinary.uploader.upload(req.file.path,{
        folder:``
    })
    const brandObject = {name,  logo:{secure_url:String,puplic_id:String}}
    const Add_subcategory = await subcategorymodel.create(brandObject)
    if(!Add_subcategory){
        cloudinary.uploader.destroy(puplic_id)
    }

}
// 2-delete brand
export const delete_brand = async (req,res,next) =>{
    const {_id} = req.params
    const {puplic_id} = req.params
    const del = await brandmodel.findByIdAndDelete({_id})
    const cloudinaryDestroy = cloudinary.uploader.destroy(puplic_id)

}
// 3-update brand
export const updateBrand =  async (req,res,next)=>{
    const {_id} = req.query
    const {name} = req.body
    const brand = brandmodel.findOne({_id})
    if(name){
    if(brand.name == name){
        return next(new Error('please enter new name'))
    }
    if(await brandmodel.findOne({name})){
        return next(new Error('this name is arleady exist'))
    }
    brand.name=name
    if(req.file){
        await cloudinary.uploader.destroy(puplic_id)
    }
    const {secure_url,puplic_id}=cloudinary.uploader.upload(req.file.path,{ folder:`${req.path}/brands/${puplic_id}`})
    
    brand.logo={secure_url,puplic_id}
    await brand.save()
    res.status(201).json({message:'Done'})

    }
}


