import { Response, Request } from 'express'
import moment from 'moment'
import CRUDController from '../../utils/crud'
import db from '../../database/models'
import RecieptService from '../../services/RecieptService'
import jsonResponse from '../../utils/jsonResponse'
import { OK } from '../../constants/statusCodes'

/**
 * Provides methods to process reciepts
 */
class RecieptsController extends CRUDController {
  public template: string = 'default.hbs'
  public model: string = 'Invoice'
  protected subModelBelongsTo: string = 'Order'
  protected subModelBelongsToField: string = 'order'
  protected modelAssociations: any = {
    include: [
      {
        model: db[this.subModelBelongsTo],
        as: this.subModelBelongsToField,
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
  }

  /**
   * Generate PDF reciepts
   * @param {any} req
   * @param {any} res
   * @param {function} next
   * @returns {*} a Response
   */
  public downloadReciept = async (req: any, res: any, next: any) => {
    const { [this.model.toLowerCase()]: invoice } = req
    const data = invoice.get({ plain: true })
    if (!data.billing)
      data.billing = {
        fullName: 'Chike Ozulumba',
        address: 'Lagos, Nigeria',
        phoneNumber: '+23480312345678',
      }

    const RECIEPT = new RecieptService(this.template)
    await RECIEPT.compile(data)
    const pdf = await RECIEPT.generate()
    res.setHeader('Content-disposition', `attachment; filename=${moment.now()}.pdf`)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': pdf.length,
    })
    return res.send(pdf)
  }

  /**
   * Get many reciepts
   * @param {any} req
   * @param {any} res
   * @returns {object} Response
   */
  public getMany = async (req: Request, res: Response) => {
    const { currentUser }: any = req
    const reciepts = await db[this.model].findAndCountAll({
      where: {
        userId: currentUser.id,
      },
      ...this.modelAssociations,
    })
    return jsonResponse({
      res,
      status: OK,
      reciepts,
      meta: {
        total: reciepts.count,
        page: 1,
        pages: 1,
      },
    })
  }
}

export default new RecieptsController()
