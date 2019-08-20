import { Op, Model } from 'sequelize'
import db from '../database/models'
import * as statusCodes from '../constants/statusCodes'
import jsonResponse from '../utils/jsonResponse'

/**
 * Provides different methods to process
 * query rcords
 */
class CRUDController {
  /**
   * ModelName  of crudcontroller
   */
  protected model: string = ''
  protected modelAssociations: Record<string, any> = {}

  /**
   * Single record name
   * @return {String} model name
   */
  protected singleRecord(): string {
    return this.model.toLowerCase()
  }

  /**
   * Many records name
   * @return {String} model name
   */
  protected manyRecords(): string {
    return `${this.model.toLowerCase()}s`
  }

  /**
   * Checks if the payment record exists
   * @param {any} req
   * @param {any} res
   * @param {*} next
   * @returns {*} response
   */
  public checkRecord = async (req: any, res: any, next: any) => {
    const { id } = req.params
    const record = await db[this.model].findOne({
      where: { id: { [Op.eq]: id } },
      ...this.modelAssociations,
    })
    if (!record) {
      return jsonResponse({
        res,
        status: statusCodes.NOT_FOUND,
        message: `${this.model} was not found`,
      })
    }
    req[this.singleRecord()] = record
    return next()
  }

  /**
   * Checks the record belongs to the current user
   * @param {any} req
   * @param {any} res
   * @param {*} next
   * @returns {*} response
   */
  public checkOwnership = async (req: any, res: any, next: any) => {
    const { currentUser } = req
    const record = req[this.singleRecord()]
    if (!record || currentUser.id !== record.userId) {
      return jsonResponse({
        res,
        status: statusCodes.UNAUTHORIZED,
        message: 'Unauthorized access',
      })
    }
    return next()
  }
  /**
   * Create a new record
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public createOne = async (req: any, res: any) => {
    const {
      currentUser: { id: userId },
    } = req
    const record = await db[this.model].create({ ...req.body, userId })
    return jsonResponse({
      res,
      status: statusCodes.CREATED,
      [this.singleRecord()]: record.get(),
    })
  }

  /**
   * Retrieve a single record
   * @param {*} req
   * @param {*} res
   * @returns {*} Response
   */
  public getOne = (req: any, res: any) => {
    return jsonResponse({
      res,
      status: statusCodes.OK,
      [this.singleRecord()]: req[this.singleRecord()].get(),
    })
  }

  /**
   * Update a single record
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public updateOne = async (req: any, res: any) => {
    const { body } = req
    const record = req[this.singleRecord()]
    await record.update(body)
    return jsonResponse({
      res,
      status: statusCodes.OK,
      [this.singleRecord()]: {
        ...record.get(),
        ...body,
      },
    })
  }

  /**
   * Retrieve all records
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public getMany = async (req: any, res: any) => {
    const {
      currentUser: { id },
    } = req
    const records = await db[this.model].findAndCountAll(
      {},
      {
        where: {
          userId: { [Op.eq]: id },
        },
        ...this.modelAssociations,
      },
    )
    return jsonResponse({
      res,
      status: statusCodes.OK,
      [this.manyRecords()]: records.rows,
      meta: {
        total: records.count,
        page: 1,
        pages: 1,
      },
    })
  }

  /**
   * Delete a single record
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public deleteOne = async (req: any, res: any) => {
    const record = req[this.singleRecord()]
    await record.destroy()
    return jsonResponse({
      res,
      status: statusCodes.NO_CONTENT,
      message: `${this.model} was successfully deleted.`,
    })
  }
}

export default CRUDController
