module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
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
        defaultValue: 1,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        noUpdate: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: queryInterface =>
    queryInterface
      .removeConstraint('invoices', 'invoices_orderId_fkey_orders')
      .then(() => queryInterface.dropTable('orders'))
      .catch(() => queryInterface.dropTable('orders')),
}
