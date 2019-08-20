import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import db from '../../../database/models'
import app from '../../../server'
import { token, userId, externalToken, productId } from '../__mocks__/data'
import { PaymentAttributes } from '../payment.model'

import * as statusCodes from '../../../constants/statusCodes'

import Nock from 'nock'
import server from '../../../server'

chai.use(chaiHttp)

let http: any

chai.use(chaiHttp)

let payment: PaymentAttributes
const prefix = '/api'

before(async () => {
  payment = await db.Payment.create({ amount: 20, userId: 1923, productId: '351043bb-3460-4937-902c-e450ab2afc46' })
})

describe('payment.router', () => {
  describe('POST /api/payments', () => {
    it('should return `Unauthorized access`', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/payments`)
        .send()
      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `"amount" is required', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/payments`)
        .set('Authorization', token)
        .send()
      expect(res.body.errors[0].message).to.equal('"amount" is required')
    })

    it('should return `the created payment`', async () => {
      const res = await chai
        .request(app)
        .post(`${prefix}/payments`)
        .set('Authorization', token)
        .send({ amount: 20, productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081' })
      expect(res.body.status).to.equal(statusCodes.CREATED)
      expect(res.body.payment).to.be.an('object')
    })
  })

  describe('PUT /api/payments/<paymentId>', () => {
    it('should return `Unauthorized access`', async () => {
      const res = await chai
        .request(app)
        .put(`${prefix}/payments/${payment.id}`)
        .send({ amount: 10 })
      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `the payment object`', async () => {
      const res = await chai
        .request(app)
        .put(`${prefix}/payments/${payment.id}`)
        .set('Authorization', token)
        .send()
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.payment).to.be.an('object')
    })
  })

  describe('GET /api/payments/<paymentId>', () => {
    it('should return `Unauthorized access`', async () => {
      const res = await chai.request(app).get(`${prefix}/payments/${payment.id}`)

      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `Unauthorized access` with an external token', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/payments/${payment.id}`)
        .set('Authorization', externalToken)

      expect(res.body.message).to.equal('Unauthorized access')
    })

    it('should return `the payment object`', async () => {
      const res = await chai
        .request(app)
        .get(`${prefix}/payments/${payment.id}`)
        .set('Authorization', token)
      expect(res.body.status).to.equal(statusCodes.OK)
      expect(res.body.payment).to.be.an('object')
    })
  })
})

describe('POST /api/v1/payment/mpesa/', () => {
  beforeEach(async () => {
    http = chai.request(server)
  })

  it('Should return 400 Bad Request, for invalid payment details sent.', (done): void => {
    http
      .post('/api/payments/mpesa/initiate')
      .set('Authorization', token)
      .then((res: any) => {
        expect(res).to.have.status(400)
      })
    done()
  })

  it('Should return 200 OK, for valid payment details sent and processed.', (done): any => {
    Nock('https://sandbox.safaricom.co.ke')
      .get('/oauth/v1/generate?grant_type=client_credentials')
      .reply(200, {
        access_token: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
      })
    Nock('https://sandbox.safaricom.co.ke')
      .post('/mpesa/stkpush/v1/processrequest')
      .reply(200, {
        MerchantRequestID: '23837-1719637-1',
        CheckoutRequestID: 'ws_CO_DMZ_381862754_20062019123829268',
        ResponseCode: '0',
        ResponseDescription: 'Success. Request accepted for processing',
        CustomerMessage: 'Success. Request accepted for processing',
      })
    const paymentDetails = {
      Amount: '500',
      PhoneNumber: '254708374149',
      AccountReference: 'Chike Ozulumba',
      TransactionDesc: 'test',
    }

    http
      .post('/api/payments/mpesa/initiate')
      .set('Authorization', token)
      .send(paymentDetails)
      .end((_err: any, { status, body }: any) => {
        expect(status).to.equal(200)
        expect(body).to.haveOwnProperty('MerchantRequestID')
        expect(body).to.haveOwnProperty('CheckoutRequestID')
        expect(body).to.haveOwnProperty('ResponseDescription')
        expect(body).to.haveOwnProperty('CustomerMessage')
      })
    done()
  })

  it('Should return 500 Internal Server Error, for invalid payment details sent.', done => {
    Nock('https://sandbox.safaricom.co.ke')
      .get('/oauth/v1/generate?grant_type=client_credentials')
      .reply(200, {
        access_token: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
      })
    Nock('https://sandbox.safaricom.co.ke')
      .post('/mpesa/stkpush/v1/processrequest')
      .reply(500)
    process.env.MPESA_CONSUMER_KEY = 'process.env.MPESA_CONSUMER_KEY'
    const paymentDetails = {
      BusinessShortCode: '174379',
      TransactionType: 'CustomerPayBillOnline',
      Amount: '500',
      PartyA: '2348131976306',
      PartyB: '174379',
      PhoneNumber: '254708374149',
      AccountReference: 'Chike Ozulumba',
      TransactionDesc: 'test',
    }

    http
      .post('/api/payments/mpesa/initiate')
      .set('Authorization', token)
      .send(paymentDetails)
      .then((res: any) => {
        expect(res.status).to.equal(500)
      })
    done()
  })

  it('Should return 500 Internal Server Error, signifying invalid processing: access token is null.', (done): void => {
    Nock('https://sandbox.safaricom.co.ke')
      .get('/oauth/v1/generate?grant_type=client_credentials')
      .reply(200, {
        access_token: null,
      })
    Nock('https://sandbox.safaricom.co.ke')
      .post('/mpesa/stkpush/v1/processrequest')
      .reply(500)
    process.env.MPESA_CONSUMER_KEY = 'process.env.MPESA_CONSUMER_KEY'
    const paymentDetails = {
      Amount: '500',
      PhoneNumber: '254724374281',
      AccountReference: 'Chike Ozulumba',
      TransactionDesc: 'test',
    }

    http
      .post('/api/payments/mpesa/initiate')
      .set('Authorization', token)
      .send(paymentDetails)
      .end((_err: any, { status, body }: any) => {
        expect(status).to.equal(500)
      })
    done()
  })

  it('Should return 500 Internal Server Error, signifying invalid processing: access token is not provided in response.', (done): void => {
    Nock('https://sandbox.safaricom.co.ke')
      .get('/oauth/v1/generate?grant_type=client_credentials')
      .reply(500, 'undefined')
    Nock('https://sandbox.safaricom.co.ke')
      .post('/mpesa/stkpush/v1/processrequest')
      .reply(500)
    process.env.MPESA_CONSUMER_KEY = 'process.env.MPESA_CONSUMER_KEY'
    const paymentDetails = {
      Amount: '500',
      PhoneNumber: '254724374281',
      AccountReference: 'Chike Ozulumba',
      TransactionDesc: 'test',
    }

    http
      .post('/api/payments/mpesa/initiate')
      .send(paymentDetails)
      .set('Authorization', token)
      .end((_err: any, res: { status: any; body: any }) => {
        const { status, body } = res
        expect(status).to.equal(500)
      })
    done()
  })
})

describe('POST /api/payments/mpesa/callback', () => {
  beforeEach(() => {
    http = chai.request(server)
  })

  it('Should return 200 OK, validating the callback endpoint.', (done): void => {
    const paymentDetails = {
      Body: {
        stkCallback: {
          MerchantRequestID: '21605-295434-4',
          CheckoutRequestID: 'ws_CO_04112017184930742',
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
        },
      },
    }

    http
      .post('/api/payments/mpesa/callback')
      .send(paymentDetails)
      .end((_err: any, { status, body }: any) => {
        expect(status).to.equal(200)
      })
    done()
  })

  it('Should return 500 internal server error, invalidating the callback endpoint.', (done): void => {
    http
      .post('/api/payments/mpesa/callback')
      .send(undefined)
      .end((_err: any, { status, body }: any) => {
        expect(status).to.equal(500)
      })
    done()
  })
})
