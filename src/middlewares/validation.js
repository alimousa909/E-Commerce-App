const ReqMethods = ['body','query','params','headers','file','files']
export const validationFunction = (schema)=>{
    return (req,res,next) =>{
        const validationErrorArr =[]
        for(const key of ReqMethods){

            const validationResult = schema[key].validate(req[key],{abortEsarly:false})
            if(validationErrorArr.error){
                validationErrorArr.push(validationResult.error.details)
             
            }
          
        }
        if(validationErrorArr.length){
            res.stutus(400).json({message:'Validation Erros'})
        }

        next()
    }
}