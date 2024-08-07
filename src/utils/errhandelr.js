export const asynchandelr = (API)=>{
    return (req,res,next)=>{
        API(req,res,next).catch((err)=>{
            res.json({message:''})
        })

        
    }
}
export const globalResponse = (err, req, res, next) => {
    if (err) {
      console.log(req.validationErrors)
      if (req.validationErrors) {
        return res
          .status(err['cause'] || 500)
          .json({ error: req.validationErrors })
      }
      return res.status(err['cause'] || 500).json({ message: err.message })
    }
  }
  
  