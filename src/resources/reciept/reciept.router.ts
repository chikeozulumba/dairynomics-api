import { Router } from 'express'
import { celebrate } from 'celebrate'
import checkAuth from '../../middlewares/checkAuth'
import { validateOrderId } from '../order/order.validator'
import asyncHandler from '../../middlewares/asyncHandler'
import Reciepts from './reciept.controller'

const router = Router()

router
  .route('/')
  .all(asyncHandler(checkAuth))
  .get(asyncHandler(Reciepts.getMany))

router
  .route('/download/:id')
  .all(
    asyncHandler(checkAuth),
    validateOrderId,
    asyncHandler(Reciepts.checkRecord),
    asyncHandler(Reciepts.checkOwnership),
  )
  .get(asyncHandler(Reciepts.downloadReciept))

export default router
