import { Op } from 'sequelize'
import db from '../../database/models'
import * as statusCodes from '../../constants/statusCodes'
import jsonResponse from '../../utils/jsonResponse'

import CRUDController from '../../utils/crud'

/**
 * Provides methods to process orders
 */
class UsersController extends CRUDController {
  /**
   * Model Name  of payment controller
   */

  /**
   *Find all the orders made
   * @param {any} req
   * @param {any} res
   * @returns {*} a Response
   */
  public getRecordsWithAssociations = async (req: any, res: any) => {
    const { params } = req
    const user = await db['Order'].findAll({
      where: {
        userId: { [Op.eq]: params.id },
      },
      include: [
        {
          model: db['OrderItem'],
          as: 'orderItems',
        },
      ],
    })
    return jsonResponse({
      res,
      status: statusCodes.OK,
      user,
    })
  }
}

export default new UsersController()
