import 'dotenv/config'
const { HOST, ADMIN_EMAIL } = process.env

export default {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Dairynomics (Ecommerce)',
    description: 'An Ecommerce platform for Cellfam',
    contact: {
      name: 'Cellfam',
      email: ADMIN_EMAIL,
    },
  },
  host: HOST,
  basePath: '/api/v1/',
  produces: ['application/json'],
  consumes: ['application/json'],
  schemes: ['https', 'http'],
  paths: {
    ...require('./paths/payment'),
    ...require('./paths/subscriptions'),
    ...require('./paths/order'),
    ...require('./paths/product'),
    ...require('./paths/cart'),
    ...require('./paths/ProductCategory'),
    ...require('./paths/invoice'),
  },
  definitions: {
    ...require('./definitions/ErrorResponse'),
    ...require('./definitions/Payment'),
    ...require('./definitions/Order'),
    ...require('./definitions/Product'),
    ...require('./definitions/Cart'),
    ...require('./definitions/ProductCategory'),
    ...require('./definitions/invoice'),
  },
}
