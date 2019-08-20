'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('invoices', {
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
      orderId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amoutToBePaid: {
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
    })
  },
  down: queryInterface => queryInterface.dropTable('invoices'),
}
