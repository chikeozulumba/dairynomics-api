import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'
export interface PaymentAttributes {
  id?: string
  userId: number
  amount: number
  productId: string
  currency?: number
  provider?: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

export type PaymentInstance = Sequelize.Instance<PaymentAttributes> & PaymentAttributes

export const PaymentInit = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<PaymentAttributes> = {
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
    },
    amount: {
      type: Sequelize.DECIMAL,
    },
    currency: {
      type: Sequelize.STRING,
      defaultValue: 'KES',
    },
    provider: {
      type: Sequelize.STRING,
      defaultValue: 'M-Pesa',
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'pending',
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
  return sequalize.define<PaymentInstance, PaymentAttributes>('Payment', attributes, {
    tableName: 'payments',
  })
}
