import { Router } from 'express'
import { celebrate } from 'celebrate'
import Users from '../user/user.controller'
import * as Validator from '../order/order.validator'
import checkAuth, { checkIfAdmin } from '../../middlewares/checkAuth'
import asyncHandler from '../../middlewares/asyncHandler'
import { validateUserId } from '../order/order.validator'

const router = Router()

router
  .route('/:id/orders')
  .all(validateUserId, asyncHandler(checkAuth))
  .get(asyncHandler(checkIfAdmin), asyncHandler(Users.getRecordsWithAssociations))

export default router
