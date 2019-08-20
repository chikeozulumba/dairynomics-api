import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import {
  SubscriptionFactory,
  SubscriptionInstance,
  SubscriptionAttributes,
} from '../../resources/subscription/subscription.model'
import { PaymentInit, PaymentAttributes, PaymentInstance } from '../../resources/payment/payment.model'
import { OrderAttributes, OrderInit, OrderInstance } from '../../resources/order/order.model'
import { OrderItemAttributes, OrderItemInit, OrderItemInstance } from '../../resources/order/orderitem'
import { ProductInit, ProductAttributes, ProductInstance } from '../../resources/product/product.model'
import { CartInit, CartAttributes, CartInstance } from '../../resources/cart/cart.model'
import {
  ProductCategoryInit,
  ProductCategoryAttributes,
  productCategoryInstance,
} from '../../resources/productCategories/productCategory.model'
import { InvoiceInstance, InvoiceAttributes, InvoiceInit } from '../../resources/invoice/invoice.model'

dotenv.config()

const DBConfig = require('../config/config')
const env = process.env.NODE_ENV || 'development'
const config = DBConfig[env]

const sequelize = new Sequelize(config.url as string, config)

interface Database {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  Payment: Sequelize.Model<PaymentInstance, PaymentAttributes>
  Subscription: Sequelize.Model<SubscriptionInstance, SubscriptionAttributes>
  Cart: Sequelize.Model<CartInstance, CartAttributes>
  Order: Sequelize.Model<OrderInstance, OrderAttributes>
  OrderItem: Sequelize.Model<OrderItemInstance, OrderItemAttributes>
  Product: Sequelize.Model<ProductInstance, ProductAttributes>
  ProductCategory: Sequelize.Model<productCategoryInstance, ProductCategoryAttributes>
  Invoice: Sequelize.Model<InvoiceInstance, InvoiceAttributes>
}

const db: Database = {
  sequelize,
  Sequelize: Sequelize.Sequelize,
  Payment: PaymentInit(sequelize),
  Subscription: SubscriptionFactory(sequelize, Sequelize),
  Cart: CartInit(sequelize),
  Order: OrderInit(sequelize),
  OrderItem: OrderItemInit(sequelize),
  Product: ProductInit(sequelize),
  ProductCategory: ProductCategoryInit(sequelize),
  Invoice: InvoiceInit(sequelize),
}

Object.keys(db).forEach((modelName): void => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export default db
