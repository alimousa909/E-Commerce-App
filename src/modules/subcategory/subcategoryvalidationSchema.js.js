import joi from 'joi'
export const SubCategorySchema = {
  body: joi.object({  name: joi.string().min(4).max(100),}).options({ presence: 'required' }),
}

export const updateSubCategory = {
    body: joi.object({  name: joi.string().min(4).max(100),}).options({ presence: 'required' }),
  }
  