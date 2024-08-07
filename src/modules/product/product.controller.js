import { brandmodel } from "../../../DataBase/models/brand.model.js";
import { subcategorymodel } from "../../../DataBase/models/subcategory.model.js";
import { categorymodel } from "../../../DataBase/models/category.model.js";
import { productmodel } from "../../../DataBase/models/product.model.js";
import { paginationFunction } from "../../utils/pagination.js";
import { ApiFeuters } from "../../utils/apiFeuters.js";

// ========= add product ======
export const create_product = async (req,res,next)=>{
    const {customid} = req.params
    const {name,price,amount} = req.body
    const categoryexists =await categorymodel.findById({customid})
    const subcategoryexists = await subcategorymodel.findById({customid})
    const brandexists = await brandmodel.findById({customid})
    if(!categoryexists || !subcategoryexists || !brandexists){
        res.json({message:'invalid product '})
    }
    const priceafterDiscount =price - (price *(discount ||0)/100)
    if(!req.file){
        res.json({message:'please upload an image'})
    }
    if(await brandmodel.find({name})){
        res.json ({message:'please enter new name'})
    }
     const slug = slugify(name,"_")
     const {secure_url,puplic_id} =await cloudianry.uploader.upload(req.file.path,{folder:``})
     const productObject ={name,  image:{secure_url,puplic_id},size,colour,price,amount,description}

     const addproduct = await productmodel.create(productObject)
     
}
// ======= update product ======
export const update_product = async (req,res,next) =>{
    const {title,desc,price,finalprice,size,colour} = req.body
    const {categoryId,subcategoryId,brandId,productid} =req.query
    const {name} = req.body
    const product = await productmodel.findById({productid})
    if(!product){
        next (new error ('invalid brand'))
    }
    if(categoryId){
    const categoryexists = await categorymodel.findById({categoryId})
    if(!categoryexists){
        next (new error('invalid category'))
    }
    product.categoryId = categoryId
}
        if(subcategoryId){
        const subcategoryexists = await subcategorymodel.findById({subcategoryId})
        if(!subcategoryexists){
            next (new error ('invalid subcategory'))
        }
    }
    product.subcategoryId = subcategoryId
    if(brandId){
        const bradnexists = await brandmodel.findById({brandId})
        if(!bradnexists){
            next (new error ('invalid brand'))
        }
    }
    product.brandId =brandId
       

        if(price && discount){
            req.body.finalprice =price - price * (discount /100 )
        }
        if(price){
            req.body.finalprice =price - price *(product.discount /100 )
        }
        if(discount){
            req.body.finalprice = product.price - price *(discount /100 )
        }
        if(req.files?.length){
        let ImageArr = []
        for(const file of req.files){
          //  const {secure_url,puplic_id} =await cloudianry.uploader.upload(file.path,{folder:`${}`})
            ImageArr.push()
        }
        let puplic_ids = []
        for(const image of product.image){
            puplic_ids.push()
        }
        await cloudianry.api.delete_resources(puplic_ids)
        product.image =ImageArr
             }
             if(title) product.title = title
             if(colour) product.colour = colour
             if(size) product.size = size

             await product.save()
        
}
export const getAllProducts = async (req,res,next)=>{
    const {page , size} = req.query
    const {limit,skip} = paginationFunction({page,size})

    const products = await productmodel.find().limit(limit).skip(skip).populate([{
        path:'Reviews'
    }])
    res.status(200).json({message:'Done'})
}
// ====== get products=====
export const serchProductByName = async (req,res,next) => {
    const {name,page,size}= req.body
    const {limit,skip} = paginationFunction({page,size})
    const products = await productmodel.find({
    $or:[
       { name:{$regex:req.body.name , $options:"i"}},
       { description:{$regex:req.body.name , $options:"i"}}
    ]
    }).limit(limit).skip(skip)

    res.status(200).json({message:'Done'})
}
export const listallproducts = async (req,res,next)=>{
  /*  const {page , size} = req.query
    const {limit,skip} = paginationFunction({page,size})

    const queryinstence = {...req.query}
    const excludeKeyArr = ['page','size','sort','select','search']
    excludeKeyArr.forEach((key)=> delete queryinstence[key])
    const queryString = JSON.parse(JSON.stringify(queryinstence).replace(/gt|gte|lt|lte|in|nin|eq|neq|regex/g,(match)=>'$${match'),)
    const products = await productmodel.find(queryString) */
    const ApiFeutersInstence = new ApiFeuters(productmodel.find({}),req.query).pagination()
    const products = await ApiFeutersInstence.mongooseQuery
 


    res.status(200).json({message:'Done'})
}
export const deleteProducts = async (req,res,next)=>{
    const { productId } = req.query
  const product = await productModel.findByIdAndDelete(productId)
  if (!product) {
    return next(new Error('invalid product  ', { cause: 400 }))
  }
  res.status(200).json({ message: 'Done', product })
}