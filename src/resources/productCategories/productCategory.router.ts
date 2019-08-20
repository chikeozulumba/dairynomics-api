import { Router } from 'express'
import { celebrate } from 'celebrate'
import controller from './productCategory.controller'
import checkAuth, { checkIfAdmin } from '../../middlewares/checkAuth'
import asyncHandler from '../../middlewares/asyncHandler'
import * as validator from './productCategoryValidations'

const router = Router()

router
  .route('/')
  .all(asyncHandler(checkAuth))
  .post(asyncHandler(checkIfAdmin), celebrate({ body: validator.createCategory }), asyncHandler(controller.createOne))
  .get(asyncHandler(controller.getMany))

router
  .route('/:id')
  .all(asyncHandler(checkAuth), celebrate({ params: validator.categoryId }))
  .delete(asyncHandler(checkIfAdmin), asyncHandler(controller.checkRecord), asyncHandler(controller.deleteOne))
  .put(
    asyncHandler(checkIfAdmin),
    celebrate({ body: validator.updateCategory }),
    asyncHandler(controller.checkRecord),
    asyncHandler(controller.updateOne),
  )
  .get(asyncHandler(controller.checkRecord), asyncHandler(controller.getOne))

export default router
