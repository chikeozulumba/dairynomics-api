import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'
export interface InvoiceAttributes {
  id?: string
  userId: number
  orderId: string
  invoiceNumber: any
  amoutToBePaid: number
  paymentStatus: string
  createdAt?: string
  updatedAt?: string
}

export type InvoiceInstance = Sequelize.Instance<InvoiceAttributes> & InvoiceAttributes
export const InvoiceInit = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<InvoiceAttributes> = {
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
    invoiceNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    orderId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'orders',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    amoutToBePaid: {
      allowNull: false,
      type: Sequelize.DECIMAL,
    },
    paymentStatus: {
      type: Sequelize.ENUM,
      values: ['paid', 'pending'],
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

  const Invoice = sequelize.define<InvoiceInstance, InvoiceAttributes>('Invoice', attributes, {
    tableName: 'invoices',
  })

  Invoice.associate = ({ Order }) => {
    Invoice.belongsTo(Order, {
      foreignKey: 'orderId',
      as: 'order',
      onDelete: 'CASCADE',
    })
  }
  return Invoice
}
