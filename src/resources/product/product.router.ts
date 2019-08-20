import { Router } from 'express'
import { celebrate } from 'celebrate'
import { createProduct, validateProductId, updateProduct } from './product.validator'
import ProductController from './product.controller'
import checkAuth from '../../middlewares/checkAuth'
import asyncHandler from '../../middlewares/asyncHandler'

const productRouter: Router = Router()

productRouter
  .route('/')
  .all(asyncHandler(checkAuth))
  .post(celebrate({ body: createProduct }), asyncHandler(ProductController.createOne))
  .get(asyncHandler(ProductController.getSellerProducts))

productRouter
  .route('/:id')
  .all(asyncHandler(checkAuth), celebrate({ params: validateProductId }))
  .get(asyncHandler(ProductController.checkRecord), asyncHandler(ProductController.getOne))
  .put(
    celebrate({ body: updateProduct }),
    asyncHandler(ProductController.checkRecord),
    asyncHandler(ProductController.checkOwnership),
    asyncHandler(ProductController.updateOne),
  )
  .delete(
    asyncHandler(ProductController.checkRecord),
    asyncHandler(ProductController.checkOwnership),
    asyncHandler(ProductController.deleteOne),
  )

export default productRouter
