import chai, { expect } from 'chai'
import Nock from 'nock'
import HTTPService from '../HttpService'

let http: any
const PORT: any = process.env.PORT || 9090
const baseRoute = `http://localhost:${PORT}`

describe('HTTP Request service', () => {
  beforeEach(() => {
    http = new HTTPService(baseRoute, {})
  })

  describe('GET /oauth', () => {
    it('Should return 500 internal server error, when request cannot be completed.', (done): void => {
      Nock(baseRoute)
        .get('/oauth')
        .reply(500)
      http
        .get('/oauth')
        .then()
        .catch((error: any) => {
          expect(error).to.have.status(500)
          done()
        })
    })

    it('Should return 500 internal server error, when request cannot be completed.', (done): void => {
      Nock(baseRoute)
        .get('')
        .reply(500)
      http
        .get('')
        .then()
        .catch((error: any) => {
          expect(error).to.equal(undefined)
        })
      done()
    })
  })
})
