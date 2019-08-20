import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface OrderItemAttributes {
  id?: string
  orderId: string
  userId: number
  productId: string
  quantity: number
  amount?: number
  createdAt?: string
  updatedAt?: string
}

export type OrderItemInstance = Sequelize.Instance<OrderItemAttributes> & OrderItemAttributes

export const OrderItemInit = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<OrderItemAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    orderId: {
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    productId: {
      type: Sequelize.UUID,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  }
  const OrderItem = sequelize.define<OrderItemInstance, OrderItemAttributes>('OrderItem', attributes, {
    tableName: 'order_items',
  })
  OrderItem.associate = ({ Order, Product }) => {
    OrderItem.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order',
      onDelete: 'CASCADE',
    })

    OrderItem.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'CASCADE',
    })
  }

  OrderItem.associate = ({ Product }) => {
    OrderItem.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'CASCADE',
    })
  }

  return OrderItem
}
