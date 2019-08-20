'use strict'

module.exports = {
  up: async queryInterface => {
    await queryInterface.addConstraint('invoices', ['orderId'], {
      type: 'foreign key',
      name: 'invoices_orderId_fkey_orders',
      references: {
        table: 'orders',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    await queryInterface.addConstraint('payments', ['productId'], {
      type: 'foreign key',
      name: 'payments_productId_fkey_products',
      references: {
        table: 'products',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },

  down: () => Promise.resolve(true),
}
