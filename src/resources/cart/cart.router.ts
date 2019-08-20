import { Router } from 'express'
import { celebrate } from 'celebrate'
import controller from './cart.controller'
import * as validator from './cart.validator'
import checkAuth from '../../middlewares/checkAuth'
import asyncHandler from '../../middlewares/asyncHandler'

const router = Router()

router
  .route('/')
  .all(asyncHandler(checkAuth))
  .post(celebrate({ body: validator.addItemToCart }), asyncHandler(controller.addToCart))
  .get(asyncHandler(controller.getUserCart))
  .put(celebrate({ body: validator.updateOne }), asyncHandler(controller.updateCart))
  .delete(asyncHandler(controller.emptyCart))

export default router
