import chai, { expect } from 'chai'
import MpesaService from '../MpesaService'
import { MpesaCredentials } from '../../types/payment'
import sinon from 'sinon'

const CREDENTIALS: MpesaCredentials = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
}

const MPESA = new MpesaService(CREDENTIALS.consumerKey, CREDENTIALS.consumerSecret)

const paymentDetails = {
  BusinessShortCode: '174379',
  TransactionType: 'CustomerPayBillOnline',
  Amount: '500',
  PartyA: '2348131976306',
  PartyB: '174379',
  PhoneNumber: '254708374149',
  CallBackURL: 'https://a8ba7fd3.ngrok.io/api/v1/payment/mpesa/callback',
  AccountReference: 'Chike Ozulumba',
  TransactionDesc: 'test',
  Password: 'test',
  Timestamp: 'test',
}

describe('Unit Tests Mpesa Service', () => {
  it('Requires MPESA consumerKey and consumer secret parameters', (done): void => {
    /**
     * Catch error thrown from MPESA Servcie class
     * @returns {*} Response
     */
    async function throwError() {
      const fooSpy = sinon.spy(await MPESA.initializeLipaNaMPesaPayment(paymentDetails))
      try {
        fooSpy()
      } catch (e) {}
      expect(fooSpy.threw).to.be.equal(true)
    }
    throwError()
    done()
  })
})
