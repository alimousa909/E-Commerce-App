import {categorymodel} from '../../../DataBase/models/category.model.js'
import slugify from 'slugify'
import { subcategorymodel } from '../../../DataBase/models/subcategory.model.js'
import { brandmodel } from '../../../DataBase/models/brand.model.js'
import { productmodel } from '../../../DataBase/models/product.model.js'
import {cloudinary} from '../../utils/CloudinaryConfigration.js'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('123456_=!ascbhdtel', 5)

// ==== ADD CATEGORY ====
export const NewCategory = async (req,res,next)=>{
    const {name} =req.body
    const slug =slugify(name,'_')
    const category = categorymodel.find({name})
    if(category){
        res.json({message:'please enter new category name'})
    }
    if(!req.file){
      return next (new Error('please upload a photo'))
    }
    const Customid = nanoid()
    const {secure_url,puplic_id}=cloudinary.uploader.upload(req.file.path,
        {folder:`${req.path}/uploads/${Customid}`}
        )
    const catobject ={name,image:{secure_url,puplic_id},slug}

    const createCategory =categorymodel.create(catobject)
    if(!createCategory){
        await cloudinary.uploader.destroy(puplic_id)
    }

}
// ==== update category ====
export const updatecategory = async (req,res,next)=>{
    const {_id} =req.params
    const {name} =req.body
    const categories = categorymodel.find({_id})
    if(name){
      if(categories.name == name.toLowercase()){
        res.json({message:'please enter new name'})
      }
      if(await categorymodel.find({name})){
        res.json({message:'this name is already exists'})
      }
      categories.name=name
      categories.slug=slugify(name,'_')
    }
    if(req.file){
        await cloudinary.uploader.destroy(puplic_id)

        const {secure_url,puplic_id}=cloudinary.uploader.upload(req.file.path,{ folder:`${req.path}/categories/${puplic_id}`})

        categories.Image={secure_url,puplic_id}
    }
   
    

    await categories.save()
    res.json({message:'Done'})
}
// ====== delete categorty ===
export const deletecategory = async (req,res,params)=>{
  const {categoryid} = req.query
  const catgoryexists =await categorymodel.findByIdAndDelete({categoryid})
  if(!catgoryexists){
    return next (new Error('fail to delete'))
  }
  const deletesubcategory = await subcategorymodel.deleteMany({categoryid})
  const deletebrand = await brandmodel.deleteMany({categoryid})
  const deletProducts = await productmodel.deleteMany({categoryid})

  if(!deletebrand.deletedCount || !deletesubcategory.deletedCount || !deletProducts.deletedCount){
    return next (new Error('fail to delete'))
  }
  await cloudinary.api.delete_resources_by_prefix(`${proces.env.FOLDER}/categories/${catgoryexists.customid}`)

  await cloudinary.api.delete_folder(`${proces.env.FOLDER}/categories/${catgoryexists.customid}`)


}
export const getallCategories = async (req,res,next)=>{
  const categories = await categorymodel.find().populate([
    {
      path:'subCategories',
      select:'name',
      populate: [
        {
          path:'Brands',
          select:'name',
        },
      ]
    }
  ])
  res.status(201).json({message:'Done'})
}
