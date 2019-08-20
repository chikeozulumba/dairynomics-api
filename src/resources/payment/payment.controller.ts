import { MpesaCredentials } from '../../types/payment' // @types
import { Response, Request } from 'express'
import MpesaService from '../../services/MpesaService'
import CRUDController from '../../utils/crud'
import db from '../../database/models'
import { formatDateToTimestamp } from './payment.utils'
import jsonResponse from '../../utils/jsonResponse'

const {
  MPESA_DEV_PASSKEY,
  MPESA_TRANSACTION_CALLBACK_URL,
  MPESA_BUSINESS_SHORTCODE,
  MPESA_BUSINESS_TRANSACTION_TYPE,
} = process.env
const CREDENTIALS: MpesaCredentials = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
}

const MPESA = new MpesaService(CREDENTIALS.consumerKey, CREDENTIALS.consumerSecret)

/**
 * Provides different methods to process
 * payments
 */
class PaymentController extends CRUDController {
  /**
   * Model Name  of payment controller
   */
  protected model = 'Payment'

  /**
   * Obtain payment status from Safaricom
   * @param {*} req
   * @param {*} res
   * @returns {*} Response
   */
  public async getPaymentStatus(req: any, res: any) {
    // The request payload received from safaricom
    const {
      body: {
        Body: {
          stkCallback: { ResultCode, ResultDesc },
        },
      },
    } = req
    const paymentStatus = {
      code: ResultCode,
      description: ResultDesc,
    }
    return res.json(paymentStatus)
  }

  /**
   * Updates payment status received from Safaricom callback
   * @param {*} paymentId
   * @param {*} paymentStatus
   * @returns {*} Payment Update Status
   */
  public async updatePaymentStatus(paymentId: string, paymentStatus: string) {
    const payment = await db.Payment.findByPk(paymentId)
    if (!payment) {
      return { message: 'Payment not found' }
    }
    await payment.update({
      status: paymentStatus,
    })
    return { message: 'Payment updated' }
  }

  /**
   * Obtain payment to initialize payment on Safaricom
   * @param {*} req
   * @param {*} res
   * @returns {*} Response
   */
  public async initializePayment(req: Request, res: Response): Promise<any> {
    await MPESA.authenticateCredentials() // Needed to get OAUTH token from MPESA API
    const { body } = req
    const Timestamp = formatDateToTimestamp(new Date())
    const Password = Buffer.from(`${MPESA_BUSINESS_SHORTCODE}${MPESA_DEV_PASSKEY}${Timestamp}`).toString('base64')
    const { data } = await MPESA.initializeLipaNaMPesaPayment({
      ...body,
      Password,
      Timestamp,
      CallBackURL: MPESA_TRANSACTION_CALLBACK_URL,
      BusinessShortCode: MPESA_BUSINESS_SHORTCODE,
      TransactionType: MPESA_BUSINESS_TRANSACTION_TYPE,
      PartyA: body['PhoneNumber'],
      PartyB: MPESA_BUSINESS_SHORTCODE,
    })
    return jsonResponse({
      res,
      status: 200,
      ...data,
    })
  }
}

export default new PaymentController()
