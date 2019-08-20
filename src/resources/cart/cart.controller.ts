import { Response } from 'express'
import CRUDController from '../../utils/crud'
import db from '../../database/models'
import jsonResponse from '../../utils/jsonResponse'
import * as statusCodes from '../../constants/statusCodes'
import { CartInstance } from './cart.model'
import { ProductAttributes } from '../product/product.model'

/**
 * Provides different methods to interact with the cart
 *
 */
class CartController extends CRUDController {
  /**
   * Model Name  of cart controller
   */
  protected model = 'Cart'

  /**
   * Private method to get items in cart with corresponding product details
   * @param {string} userId
   * @returns {*} response
   */
  private getDetailedCart = (userId: string): Promise<CartInstance[]> =>
    db.Cart.findAll({
      where: { userId },
      include: [{ model: db.Product, as: 'product' }],
    })

  /**
   * Get Product if exists
   * @param {string} productId
   * @returns {undefined}
   */
  private getProduct = (productId: string): Promise<ProductAttributes | null> => {
    return db.Product.findByPk(productId)
  }

  /**
   * Add item to cart
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public addToCart = async (req: any, res: any): Promise<Response> => {
    const {
      currentUser: { id: userId },
      body,
    } = req
    const { productId, quantity } = body
    const product = await this.getProduct(productId)
    if (!product) {
      return jsonResponse({
        res,
        status: statusCodes.NOT_FOUND,
        message: 'Product does not exist',
      })
    }
    const existingEntry = await db.Cart.find({
      where: { userId, productId },
    })
    if (existingEntry) {
      const currentProduct = existingEntry['dataValues']
      const newQuantity = currentProduct.quantity + quantity
      await existingEntry.update({
        quantity: newQuantity,
      })
      const cartItems = await this.getDetailedCart(userId)
      return jsonResponse({
        res,
        status: statusCodes.OK,
        message: 'Cart Item Updated',
        cartItems,
      })
    }

    await db.Cart.create({ ...req.body, quantity, userId })
    const cartItems = await this.getDetailedCart(userId)
    return jsonResponse({
      res,
      status: statusCodes.CREATED,
      message: 'Item successfully added to cart',
      cartItems,
    })
  }

  /**
   * Update cart
   * @param {*} req
   * @param {*} res
   * @returns {*} New User Cart
   */
  public updateCart = async (req: any, res: any): Promise<Response> => {
    const { currentUser, body } = req
    const { quantity, productId } = body
    const product = await this.getProduct(productId)
    if (!product) {
      return jsonResponse({
        res,
        status: statusCodes.NOT_FOUND,
        message: 'Product does not exist',
      })
    }
    const userId = currentUser.id
    const cartItem = await db.Cart.find({
      where: { userId, productId },
    })

    if (!cartItem) {
      return jsonResponse({
        res,
        status: statusCodes.NOT_FOUND,
        message: 'Cart item was not found',
      })
    }
    if (quantity === 0) {
      await db.Cart.destroy({ where: { userId, productId } })
      const cartItems = await this.getDetailedCart(userId)
      return jsonResponse({
        res,
        status: statusCodes.OK,
        message: 'Item removed from cart successfully',
        cartItems,
      })
    }
    await cartItem.update({
      quantity,
    })
    const cartItems = await this.getDetailedCart(userId)
    return jsonResponse({
      res,
      status: statusCodes.OK,
      message: 'Cart Item updated',
      cartItems,
    })
  }

  /**
   * Retrieve all records for the logged in user
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public getUserCart = async (req: any, res: any): Promise<Response> => {
    const { currentUser } = req
    const cartItems = await this.getDetailedCart(currentUser.id)
    return jsonResponse({
      res,
      status: statusCodes.OK,
      cartItems: cartItems,
      meta: {
        total: cartItems.length,
        price: this.calculateCartTotal(cartItems),
        page: 1,
        pages: 1,
      },
    })
  }

  /**
   * Retrieve all records for the logged in user
   * @param {CartInstance[]} items
   * @returns {number} response
   */
  public calculateCartTotal = (items: CartInstance[]): number => {
    let total = 0
    items.forEach((item: any) => {
      total += item.product.price
    })
    return total
  }

  /**
   * Remove all cart items for the logged in user
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  public emptyCart = async (req: any, res: any): Promise<Response> => {
    const { currentUser } = req
    await db.Cart.destroy({ where: { userId: currentUser.id } })
    return jsonResponse({
      res,
      status: statusCodes.NO_CONTENT,
    })
  }
}

export default new CartController()
