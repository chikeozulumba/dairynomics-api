import { Request, Response } from 'express'
import moment from 'moment'
import db from '../../database/models'
import CRUDController from '../../utils/crud'
import * as statusCodes from '../../constants/statusCodes'
import jsonResponse from '../../utils/jsonResponse'

/**
 * Class handles different methods for
 * service provider subscription
 */
class SubscriptionController extends CRUDController {
  /**
   * Model Name  of payment controller
   */
  protected model = 'Subscription'

  /**
   * Get a record
   * @param {object} req userId
   * @param {object} res
   * @param {*} next
   * @returns {object} response
   */
  public async checkSubscription(req: Request, res: Response, next: any): Promise<Response> {
    const { id: userId } = req['currentUser']
    const subscribed = await db.Subscription.findOne({
      where: {
        userId,
      },
    })

    if (!subscribed) {
      return jsonResponse({
        res,
        status: statusCodes.NOT_FOUND,
        message: 'You are not subscribed on the Dairynomics Platform',
      })
    }

    req['Subscription'] = subscribed

    return next()
  }

  /**
   * Create a service provider subscription record
   * @param {object} req userId
   * @param {object} res
   * @returns {object} created subscription message
   */
  public async createSubscription(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req['currentUser']
    const dueDate = moment().add(3, 'M')
    const subscribed = await db.Subscription.findOne({
      where: {
        userId,
      },
    })

    if (subscribed) {
      return jsonResponse({
        res,
        status: statusCodes.OK,
        message: 'User is already subscribed on the Dairynomics Platform',
      })
    }

    await db.Subscription.create({ userId, dueDate })
    return jsonResponse({
      res,
      status: statusCodes.CREATED,
      message: 'You are subscribed on the Dairynomics Platform',
    })
  }

  /**
   * Get a service provider subscription record
   * @param {object} req userId
   * @param {object} res
   * @returns {object} single subscription record
   */
  public async getUserSubscription(req: Request, res: Response): Promise<Response> {
    const subscribed = req['Subscription'].get()
    const now = moment()
    const dueDate = subscribed.dueDate
    const expirationDays = moment(dueDate).diff(now, 'days')

    return jsonResponse({
      res,
      status: statusCodes.OK,
      subscribed: { ...subscribed, expirationDays },
    })
  }

  /**
   * Function returns a date object
   * @param {string} plan
   * @returns {date} A dueDate is returned
   */
  public static getDate(plan: string): Date {
    let dueDate: any
    const subscriptionPlans = {
      bronze: 3,
      silver: 6,
      gold: 12,
    }

    dueDate = moment().add(subscriptionPlans[plan], 'M')
    return dueDate
  }

  /**
   * Update a service provider subscription record
   * @param {object} req userId, plan
   * @param {object} res
   * @returns {object} updated subscription message
   */
  public async updateSubscription(req: Request, res: Response): Promise<Response> {
    const {
      body: { plan },
    } = req
    const { id: userId } = req['currentUser']
    const dueDate = SubscriptionController.getDate(plan)

    await db.Subscription.update(
      {
        plan,
        dueDate,
      },
      {
        where: {
          userId,
        },
      },
    )

    return jsonResponse({
      res,
      status: statusCodes.OK,
      message: `You have upgraded to the ${plan} plan`,
    })
  }

  /**
   * delete service provider record
   * @param {object} req userId, plan
   * @param {object} res
   * @returns {object} user unsubscribe message
   */
  public async unsubscribe(req: Request, res: Response): Promise<Response> {
    await req['Subscription'].destroy()

    return jsonResponse({
      res,
      status: statusCodes.OK,
      message: 'You have unsubscribed from the Dairynomics Platform',
    })
  }
}

export default new SubscriptionController()
