import HttpService from '../utils/HttpService'
import { Mpesa, MpesaLNMPayload } from '../types/services.d' // @types

const httpConfig = {
  headers: {
    ['Content-type']: 'Application/json',
  },
}

/** MpesaService Service class for interacting with and consuming MPesa API */
export default class MpesaService implements Mpesa {
  public apiToken = ''
  public authCredentialString = ''
  public accessToken = ''
  public baseURL = process.env.MPESA_API_BASE_URL || ''
  public Http = new HttpService(process.env.MPESA_API_BASE_URL || '', httpConfig)
  public requestError = null

  /**
   * @param  {string} consumerKey MPesa Consumer Key
   * @param  {string} consumerSecret MPesa Consumer Secret
   */
  public constructor(consumerKey: string, consumerSecret: string) {
    this.authCredentialString = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
  }

  /**
   * @name VerifyToken
   * @description Verify that accessToken has been set by authenticateCredentials method
   * @returns {boolean} true or false
   */
  protected verifyToken = (): boolean => {
    if (this.accessToken && this.accessToken.includes('Bearer ')) return true
    return false
  }

  /**
   * @name authenticateCredentials
   * @description Verify access credentials and set accessToken
   * @returns {string} Access Token
   */
  public authenticateCredentials = async () => {
    const httpConfig = {
      headers: {
        Authorization: `Basic ${this.authCredentialString}`,
      },
    }
    this.Http = new HttpService(this.baseURL, httpConfig)
    try {
      const request = await this.Http.get('/oauth/v1/generate?grant_type=client_credentials')
      const {
        data: { access_token },
      } = request
      this.Http.config.headers.Authorization = this.accessToken = `Bearer ${access_token}`
      return this.accessToken
    } catch (error) {
      this.requestError = this.Http.requestError
    }
  }

  /**
   * @name initializeLipaNaMPesaPayment
   * @param {object} payload MPesa payment credentials
   * @description Initiates payment with payment credentials with MPESA API
   * @returns {Promise} Promise
   */
  public initializeLipaNaMPesaPayment = (payload: MpesaLNMPayload): Promise<any> =>
    new Promise(async (resolve, reject) => {
      if (!this.verifyToken()) {
        throw new Error('Authentication Failed - Invalid Credentials Supplied!')
      }
      try {
        const request = await this.Http.post('/mpesa/stkpush/v1/processrequest', payload)
        return resolve(request)
      } catch (error) {
        return reject(error)
      }
    })
}
