import { Router } from 'express'
import { celebrate } from 'celebrate'
import Orders, { OrderItems } from './order.controller'
import * as Validator from './order.validator'
import checkAuth from '../../middlewares/checkAuth'
import asyncHandler from '../../middlewares/asyncHandler'
import { validateOrderId } from './order.validator'
import { validateOrderAmountAndQuantity } from './middlewares/order.middleware'

const router = Router()

router
  .route('/')
  .all(asyncHandler(checkAuth))
  .post(
    celebrate({ body: Validator.createOrder }),
    validateOrderAmountAndQuantity,
    asyncHandler(Orders.createOneWithHasManyAssociations),
  )
  .get(asyncHandler(Orders.getRecordsWithAssociations))

router
  .route('/:id')
  .all(validateOrderId, asyncHandler(checkAuth), asyncHandler(Orders.checkRecord), asyncHandler(Orders.checkOwnership))
  .put(
    celebrate({ body: Validator.updateOrder }),
    validateOrderAmountAndQuantity,
    asyncHandler(Orders.updateRecordWithAssociations),
  )
  .get(asyncHandler(Orders.getRecordsWithAssociations))
  .delete(asyncHandler(Orders.deleteOne))

router
  .route('/item/:id')
  .all(
    validateOrderId,
    asyncHandler(checkAuth),
    asyncHandler(OrderItems.checkRecord),
    asyncHandler(OrderItems.checkOwnership),
  )
  .delete(asyncHandler(OrderItems.deleteOne))

export default router
