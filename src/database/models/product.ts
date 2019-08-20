import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface ProductAttributes {
  id?: string
  userId: string
  title: string
  description?: string
  quantity: number
  price: number
  createdAt?: string
  updatedAt?: string
}

export type ProductInstance = Sequelize.Instance<ProductAttributes> & ProductAttributes

export const ProductInit = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ProductAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0,
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
  const Product = sequelize.define<ProductInstance, ProductAttributes>('Product', attributes, {
    tableName: 'products',
  })

  Product.associate = ({ User }) => {
    Product.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    })
  }

  return Product
}
