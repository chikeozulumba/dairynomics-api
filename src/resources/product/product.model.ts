import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface ProductAttributes {
  id?: string
  userId: number
  categoryId: number
  productName: string
  price: number
  countyId: number
  description: string
  quantity: number
  photos: string[]
  createdAt?: string
  updatedAt?: string
}

export type ProductInstance = Sequelize.Instance<ProductAttributes> & ProductAttributes

export const ProductInit = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ProductAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    countyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    photos: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
      defaultValue: [],
    },
  }
  const Product = sequalize.define<ProductInstance, ProductAttributes>('Product', attributes, {
    tableName: 'products',
  })
  return Product
}
