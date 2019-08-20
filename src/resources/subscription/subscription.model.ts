'use strict'
import * as Sequelize from 'sequelize'
import { SequelizeAttributes } from '../../types/sequelize'

export interface SubscriptionAttributes {
  id?: string
  userId: number
  plan?: 'free' | 'bronze' | 'silver' | 'gold'
  dueDate: object
  createdAt?: Date
  updatedAt?: Date
}

export interface SubscriptionInstance extends Sequelize.Instance<SubscriptionAttributes>, SubscriptionAttributes {}

export const SubscriptionFactory = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes,
): Sequelize.Model<SubscriptionInstance, SubscriptionAttributes> => {
  const attributes: SequelizeAttributes<SubscriptionAttributes> = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plan: {
      type: DataTypes.ENUM('free', 'bronze', 'silver', 'gold'),
    },
    dueDate: {
      type: DataTypes.DATE,
    },
  }

  const Subscription = sequelize.define<SubscriptionInstance, SubscriptionAttributes>('Subscription', attributes, {
    tableName: 'subscriptions',
  })

  return Subscription
}
