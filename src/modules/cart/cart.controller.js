import { cartmodel } from "../../../DataBase/models/cart.model.js"
import { productmodel } from "../../../DataBase/models/product.model.js"

export const addtoCaert = async (req, res,next)=>{
    const userId = req.authuser._id
    const {productId,quantity} = req.body
// check quntity and existence of product
    const checkproduct = await productmodel.find({
        _id:productId,
        stock:{$gte:quantity}
    })
    if(!checkproduct){
        res.json({message:'can\'t done this action'})
    }

    const userCart = await cartmodel.find({userId})

    if(!userCart){
        let productExists = false
        for (const product of userCart.product){
            if(productId == product.productId){
                productExists = true
                product.quantity = quantity
            }
        }
        if(!productExists){
            userCart.products.push({userId,quantity})
        }
        const newCart = await cartmodel.findOneAndUpdate(
            {userId},
            {
                products : userCart.products,
            },
            {
                new:trues
            })

    }

    const cartObject = {userId,
    products:[{productId,quantity}],
    subtotal:checkproduct.priceafterDiscount * quantity}

const cartdb = await cartmodel.create(cartObject)
res.status(201).json({message:'Done'})
}

export const deletefromCart = async (req,res,next)=>{
    const userId = req.authuser._id
    const {productId} = req.body

    // product check
    const productCheck = await productmodel.findOne({_id:productId}, )
    if(productCheck){
        re
    }
    const usercrt = await cartmodel.findOne({userId,
    'products.productId':productId})
    if(usercrt){

    }
    usercrt.products.forEach((ele)=>{
        if(ele.productId == productId){
            usercrt.products.splice(userCart.products.indexOf(ele),1)
        }
    })
    await usercrt.save()
    res.json({messae:'Done'})

}