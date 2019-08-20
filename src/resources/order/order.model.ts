import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface OrderAttributes {
  id?: string
  userId: number | string
  amount: number
  quantity: number
  status?: string
  comments?: string
  orderItems?: any
  createdAt?: string
  updatedAt?: string
}

export type OrderInstance = Sequelize.Instance<OrderAttributes> & OrderAttributes

export const OrderInit = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<OrderAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    comments: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }
  const Order = sequelize.define<OrderInstance, OrderAttributes>('Order', attributes, {
    tableName: 'orders',
  })

  Order.associate = ({ OrderItem }) => {
    Order.hasMany(OrderItem, {
      foreignKey: 'orderId',
      as: 'orderItems',
      onDelete: 'CASCADE',
    })
  }

  return Order
}
