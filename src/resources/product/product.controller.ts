import db from '../../database/models'
import CRUDController from '../../utils/crud'
import { Request, Response } from 'express'
import * as statusCodes from '../../constants/statusCodes'
import jsonResponse from '../../utils/jsonResponse'

/**
 * @class ProductController
 * @description Controller class for the product endpoint
 * @exports ProductController
 */
class ProductController extends CRUDController {
  protected model = 'Product'

  /**
   * @method getSellersProducts
   * @description Controller method to get all the products uploaded by a seller
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {object} - Response object
   */
  public async getSellerProducts(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req['currentUser']
    const products = await db.Product.findAll({ where: { userId } })
    return jsonResponse({ res, status: statusCodes.OK, products })
  }
}

export default new ProductController()
