import jsonResponse from '../../../utils/jsonResponse'
import * as statusCodes from '../../../constants/statusCodes'

export const validateOrderAmountAndQuantity = async (req: any, res: any, next: any) => {
  const { orderItems, amount, quantity } = req.body
  let totalOrderItemsCost = 0
  let totalOrderItemsQuantity = 0
  let message = null
  orderItems.forEach((orderItem: any): void => {
    totalOrderItemsCost += orderItem.amount
    totalOrderItemsQuantity += orderItem.quantity
  })

  if (totalOrderItemsCost === amount && totalOrderItemsQuantity === quantity) return next()
  else if (totalOrderItemsQuantity !== quantity) {
    message = `Quantity of items listed does not match sum total quantity of order items placed.`
  }
  return jsonResponse({
    res,
    status: statusCodes.BAD_REQUEST,
    message: message || `Price amount listed does not match sum price of order items placed.`,
  })
}
