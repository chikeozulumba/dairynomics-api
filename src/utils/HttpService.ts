import Axios from 'axios'

/** HTTPService Custom HTTP request library built on axios */
export default class HTTPService implements HTTPService {
  public baseURL: string
  public generatedUrl: any
  public config: Record<string, any>
  public requestError: null

  /**
   * @param  {[string]} url Base Url for every request instance
   * @param  {[string]} config Custom request configuration
   */
  public constructor(url: string, config: Record<string, any>) {
    this.baseURL = url
    this.config = config
  }

  /**
   * @name generateUrl
   * @description Generates the action URL, by combining the Base path with absolute/relative path
   * @param {string} path URL path
   * @returns {string} Generated action URL
   */
  protected generateUrl = (path: string): string => (path && path !== '' ? `${this.baseURL}${path}` : `${this.baseURL}`)

  /**
   * @name get
   * @description GET Method
   * @param {string} path URL path
   * @returns {Promise} Promise
   */
  public get = (path: string): Promise<any> =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await Axios.get(this.generateUrl(path), this.config)
        return resolve(data)
      } catch (error) {
        return reject(error.response)
      }
    })

  /**
   * @name post
   * @description POST Method
   * @param {string} path URL path
   * @param {string} payload POST Form Data
   * @returns {Promise} Promise
   */
  public post = (path: string, payload: Record<string, any>): Promise<any> =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await Axios.post(this.generateUrl(path), payload, this.config)
        return resolve(data)
      } catch (error) {
        return reject(error.response)
      }
    })
}
