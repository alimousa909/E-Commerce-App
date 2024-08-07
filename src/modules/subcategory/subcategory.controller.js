import slugify from 'slugify'
import { categorymodel } from '../../../DataBase/models/category.model.js'
import { subcategorymodel } from '../../../DataBase/models/subcategory.model.js'
import nanoid from 'nanoid'
import { productmodel } from '../../../DataBase/models/product.model.js'
import { brandmodel } from '../../../DataBase/models/brand.model.js'
import cloudinary from '../../utils/CloudinaryConfigration.js'

// 1-add subcat
export const  createSubcategory = async(req,res,next)=>{
    const {name}=req.body
    const {customid}=req.params
    const findCat = await categorymodel.findById({customid})
    if(!findCat){
        res.json({message:'invalid category'})
    }
    if(await subcategorymodel.find({name})){
        res.json({message:'error occured dublicate name'})
    }
    const slug =slugify(name,'_')
    if(!req.file){
        res.json({message:'please upload a subcat photo'})
    }

    const {secure_url,puplic_id}=cloudinary.uploader.upload(req.file.path,{folder:`${ali}/subcategories/${customid}}`})

    const subObject = {name,slug,Image:{secure_url,puplic_id}}
    const supCategory =await subcategorymodel.create(subObject)
    if(!supCategory){
        cloudinary.uploader.destroy(puplic_id)
    }

}
// 2- getallsubcategories
export const getAllsubcategories = async (req,res,next)=>{
    const subcatgory = await subcategorymodel.find().populate([
        {
            path:'catgoryid',
            select:'slug',
        }
    ])
    res.status(201).json({message:'Done'})
}
// 3 - Delete SubCatgory
export const RemoveSubcategory = async (req,res,next) =>{
    const {_id} = req.query
    const deletesubcategory = await subcategorymodel.findByIdAndDelete({_id})
    if(!deletesubcategory){
        next (new Error('Fail'))
    }
    const deleteproduct = await productmodel.deleteMany(_id)
    const deletebrand = await brandmodel.deleteMany(_id)
    if(!deletebrand.deletedCount || ! deleteproduct.deletedCount){
        return next (new Error ('Fail to delete'))
    }
    await cloudinary.api.delete_resources_by_prefix(`${proces.env.FOLDER}/subcategory/${deletesubcategory._id}`)

    await cloudinary.api.delete_folder(`${proces.env.FOLDER}/subcatgory/${deletesubcategory._id}`)
    res.status(201).json({message:'Done'})
}
// 4-update Subcategory
export const updateSubCategory = async (req,res,next)=>{
    const {name} = req.body
    const {_id} = req.query
    const subCta = await subcategorymodel.findById({_id})
    if(name){
        if(subCta.name == name.toLowerCase()){
            return next (new Error ('please enter new name'))
        }
        if(await subcategorymodel.find(name)){
            return next (new Error ('this name is already exists'))
        }
    }
    if(req.file){
        await cloudinary.uploader.destroy(puplic_id)

        const {secure_url,puplic_id}=cloudinary.uploader.upload(req.file.path,{ folder:`${req.path}/subcategory/${puplic_id}`})

        subCta.Image={secure_url,puplic_id}
    }
    await subCta.save()
    res.status(201).json({message:'Done'})
}