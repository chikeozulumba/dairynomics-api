import express, { Request, Response } from 'express'
import logger from 'morgan'
import cors from 'cors'
import joiErrors from './middlewares/joiErrors'
import paymentRouter from './resources/payment/payment.router'
import subscriptionRouter from './resources/subscription/subscription.router'
import productRouter from './resources/product/product.router'
import cartRouter from './resources/cart/cart.router'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger'
import ordersRouter from './resources/order/order.router'
import usersRouter from './resources/user/user.router'
import productCategoryRoutes from './resources/productCategories/productCategory.router';
import invoiceRouter from './resources/invoice/invoice.router'
import recieptRouter from './resources/reciept/reciept.router'

const apiPrefix = '/api'

// Set up the express app
const app = express()

// Enable CORS
app.use(cors())

// Log requests to the console.
app.use(logger('dev'))

// Parse incoming requests data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(`${apiPrefix}/payments`, paymentRouter)
app.use(`${apiPrefix}/orders`, ordersRouter)
app.use(`${apiPrefix}/users`, usersRouter)
app.use(`${apiPrefix}/products`, productRouter)
app.use(`${apiPrefix}/subscriptions`, subscriptionRouter)
app.use(`${apiPrefix}/carts`, cartRouter)
app.use(`${apiPrefix}/categories`, productCategoryRoutes)
app.use(`${apiPrefix}/payment`, paymentRouter)
app.use(`${apiPrefix}/invoices`, invoiceRouter)
app.use(`${apiPrefix}/reciepts`, recieptRouter)

app.get('/test', function(req, res) {
  return res.sendFile('./index.html', { root: __dirname })
});

// Setup an index route
app.get(
  '/',
  (req: Request, res: Response): Response =>
    res.status(200).send({
      message: 'Welcome to Dairynomics Ecommerce API',
    }),
)

// Joi errors formater
app.use(joiErrors())

// Return 404 for nonexistent routes
app.use((req: Request, res: Response): Response => res.status(404).send({ message: 'Route not found' }))

// Set Port
const port = process.env.PORT || 4000

app.listen(port, (): void => console.log(`server listening at port ${port}`))

export default app
