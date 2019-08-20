import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface ProductCategoryAttributes {
  id?: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export type productCategoryInstance = Sequelize.Instance<ProductCategoryAttributes> & ProductCategoryAttributes

export const ProductCategoryInit = (sequelize: Sequelize.Sequelize) => {
  const category: SequelizeAttributes<ProductCategoryAttributes> = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
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
  return sequelize.define<productCategoryInstance, ProductCategoryAttributes>('product_categories', category, {
    tableName: 'product_categories',
  })
}
