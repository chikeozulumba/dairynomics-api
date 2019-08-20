import { Response, Request } from 'express'
import { OK, BAD_REQUEST } from '../../constants/statusCodes'
import db from '../../database/models/'
import jsonResponse from '../../utils/jsonResponse'
import moment from 'moment'
import CRUDController from '../../utils/crud'
import { Op } from 'sequelize'

/**
 * handles the creation,updating
 * and getting all the invoices
 * @param {*} req
 * @param {*} res
 * @const {uuidv4}uui
 * @returns {*} response
 */
class InvoiceHandlerController extends CRUDController {
  /**
   * Check create an invoice in the system
   * @param {*} req
   * @param {*} res
   * @const {uuidv4}uui
   * @returns {*} response
   */
  protected model: string = 'Invoice'

  public checkRecord = async (req: Request, res: Response) => {
    const {
      params: { id },
      currentUser,
    }: any = req
    const record = await db[this.model].findOne({
      where: {
        id: { [Op.eq]: id },
        userId: {
          [Op.eq]: currentUser.id,
        },
      },
      include: [
        {
          model: db['Order'],
          as: 'order',
          include: [
            {
              model: db['OrderItem'],
              as: 'orderItems',
              include: [
                {
                  model: db['Product'],
                  as: 'product',
                  attributes: ['categoryId', 'productName', 'description', 'photos'],
                },
              ],
            },
          ],
        },
      ],
    })
    if (!record) {
      return jsonResponse({
        res,
        status: BAD_REQUEST,
        message: `Record not found`,
      })
    }
    return jsonResponse({ res, status: OK, invoice: record })
  }

  public updateInvoice = async (req: Request, res: Response) => {
    const {
      body: { paymentStatus },
      params: { id },
      currentUser,
    }: any = req

    await db[this.model].update(
      { paymentStatus: paymentStatus },
      { where: { id: { [Op.eq]: id }, userId: { [Op.eq]: currentUser.id } } },
    )
    return jsonResponse({
      res,
      status: OK,
      message: 'your payment status has been update successfully',
    })
  }

  public getMany = async (req: Request, res: Response) => {
    const { currentUser }: any = req
    const allInvoices = await db[this.model].findAndCountAll({
      where: {
        userId: currentUser.id,
      },
      include: [
        {
          model: db['Order'],
          as: 'order',
          include: [
            {
              model: db['OrderItem'],
              as: 'orderItems',
              include: [
                {
                  model: db['Product'],
                  as: 'product',
                  attributes: ['categoryId', 'productName', 'description', 'photos'],
                },
              ],
            },
          ],
        },
      ],
    })
    return jsonResponse({
      res,
      status: OK,
      invoices: allInvoices,
      meta: {
        total: allInvoices.count,
        page: 1,
        pages: 1,
      },
    })
  }
}

export default InvoiceHandlerController
