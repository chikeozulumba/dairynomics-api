import { Op } from 'sequelize'
import db from '../../database/models'
import * as statusCodes from '../../constants/statusCodes'
import jsonResponse from '../../utils/jsonResponse'

import CRUDController from '../../utils/crud'

/**
 * Provides methods to process orders
 */
class OrdersController extends CRUDController {
  /**
   * Model Name  of payment controller
   */
  protected model = 'Order'
  protected subModelBelongsTo = 'OrderItem'
  protected subModelBelongsToField = 'orderItems'
  protected tableForeignKeys = ['orderId']
  public queryConditions: any = {}
  protected modelAssociations: any = {
    include: [
      {
        model: db[this.subModelBelongsTo],
        as: this.subModelBelongsToField,
        include: [
          {
            model: db['Product'],
            as: 'product',
            attributes: ['categoryId', 'productName', 'description', 'photos'],
          },
        ],
      },
    ],
  }

  /**
   * Add foreignKey fields to payload before saving
   * @param {any} subject
   * @param {any} props
   * @returns {*} a Response
   */
  protected addForeignKeysToAssociations = (subject: any[], props: Record<string, any>): any[] => {
    return subject[this.subModelBelongsToField].map((field: Record<string, any>) => {
      this.tableForeignKeys.forEach(tableForeignKey => {
        field[tableForeignKey] = subject[tableForeignKey]
      })
      return { ...field, ...props }
    })
  }

  /**
   *Create a new order
   * @param {any} req
   * @param {any} res
   * @returns {*} a Response
   */
  public createOneWithHasManyAssociations = async (req: any, res: any) => {
    const {
      body,
      currentUser: { id: userId },
    } = req
    body.userId = userId
    const model = await db[this.model].create(body)
    body[this.tableForeignKeys[0]] = model.get().id // set the foriegn key for Model, note: always the first item in the array "tableForeignKeys"
    const subModel = await db[this.subModelBelongsTo].bulkCreate(this.addForeignKeysToAssociations(body, { userId }), {
      returning: true,
    })
    if (model && subModel) {
      await db['Invoice'].create({
        userId,
        orderId: model.id,
        invoiceNumber: '#256' + new Date().getUTCMilliseconds(),
        amoutToBePaid: model.amount,
        paymentStatus: 'pending',
      })
    }
    return jsonResponse({
      res,
      status: statusCodes.CREATED,
      [this.singleRecord()]: {
        ...model.get(),
        [this.subModelBelongsToField]: subModel,
      },
    })
  }

  /**
   *Find all the orders made
   * @param {any} req
   * @param {any} res
   * @returns {*} a Response
   */
  public getRecordsWithAssociations = async (req: any, res: any) => {
    const { currentUser, params } = req
    if (params.id) {
      this.queryConditions.id = { [Op.eq]: params.id }
    }
    const orders = await db[this.model].findAll({
      where: {
        userId: { [Op.eq]: currentUser.id },
        ...this.queryConditions,
      },
      ...this.modelAssociations,
    })
    return jsonResponse({
      res,
      status: statusCodes.OK,
      orders,
    })
  }

  /**
   *Find all the orders made
   * @param {any} req
   * @param {any} res
   * @returns {*} a Response
   */
  public updateRecordWithAssociations = async (req: any, res: any) => {
    const {
      currentUser: { id: userId },
      params: { id },
      body,
    } = req
    const recordUpdateQuery = await db[this.model].findOne({
      where: { id, userId },
      include: [{ model: db[this.subModelBelongsTo], as: this.subModelBelongsToField }],
    })

    const props = { [this.tableForeignKeys[0]]: id, userId }
    await this.updateRecordFieldsWithAssociations(recordUpdateQuery, body, props)

    return jsonResponse({
      res,
      status: statusCodes.OK,
      message: `${this.model} has been updated!`,
    })
  }

  /**
   * Update record and fields associated
   * @param {any} records
   * @param {any} payload
   * @param {any} props
   * @returns {*} a Promise
   */
  protected updateRecordFieldsWithAssociations = async (records: any, payload: any, props: any = {}) => {
    records.updateAttributes(payload)
    records[this.subModelBelongsToField].map((record: any): any => {
      payload[this.subModelBelongsToField].forEach((recordField: any) => {
        if (recordField.id === record.id) {
          const fieldAttributes = { ...record.get(), ...recordField, ...props }
          record.updateAttributes(fieldAttributes)
        }
      })
    })
    return Promise.all([records])
  }
}

/**
 * Provides methods to process orders items
 */
class OrderItemsController extends CRUDController {
  protected model = 'OrderItem'
}

export default new OrdersController()
export const OrderItems = new OrderItemsController()
