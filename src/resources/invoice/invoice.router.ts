import * as express from 'express'
import { celebrate } from 'celebrate'
import InvoiceHandlerController from './invoice.controller'
import { validateInvoiceSchema, validateInvoiceUpdateSchema } from './invoice.validators'
import asyncHandler from '../../middlewares/asyncHandler'
import checkAuth from '../../middlewares/checkAuth'
const invoiceRouter = express.Router()
const invoice: InvoiceHandlerController = new InvoiceHandlerController()

invoiceRouter
  .route('/')
  .all(asyncHandler(checkAuth))
  .post(celebrate({ body: validateInvoiceSchema }))
  .get(asyncHandler(invoice.getMany))

invoiceRouter
  .route('/:id')
  .all(asyncHandler(checkAuth), asyncHandler(invoice.checkRecord))
  .put(celebrate({ body: validateInvoiceUpdateSchema }), asyncHandler(invoice.updateInvoice))
  .get(asyncHandler(invoice.checkRecord))

export default invoiceRouter
