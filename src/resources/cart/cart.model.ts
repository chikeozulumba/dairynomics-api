import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'
export interface CartAttributes {
  id?: string
  userId: number
  productId: string
  quantity?: number
  createdAt?: string
  updatedAt?: string
  Product?: any
}

export type CartInstance = Sequelize.Instance<CartAttributes> & CartAttributes

export const CartInit = (sequalize: Sequelize.Sequelize): Sequelize.Model<CartInstance, CartAttributes> => {
  const attributes: SequelizeAttributes<CartAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    productId: {
      type: Sequelize.UUID,
      references: {
        model: 'Product',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
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
  const Cart = sequalize.define<CartInstance, CartAttributes>('Cart', attributes, {
    tableName: 'cart',
  })

  Cart.associate = (models): void => {
    Cart.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      onDelete: 'CASCADE',
    })
  }

  return Cart
}
