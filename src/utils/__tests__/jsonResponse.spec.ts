import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import jsonResponse from '../jsonResponse'
import { OK } from '../../constants/statusCodes'

chai.use(sinonChai)

describe('jsonResponse', () => {
  it('should be called with meta data', () => {
    const res = mockRes()
    const meta = {
      page: 1,
      pages: 2,
      total: 15,
    }
    const data = {
      status: OK,
      res,
      meta,
    }

    jsonResponse(data)
    expect(res.json).to.have.been.calledWith({ meta, status: OK, res: undefined })
  })

  it('should return status `200`', () => {
    const res = mockRes()
    const data = {
      status: OK,
      res,
    }

    jsonResponse(data)
    expect(res.status).to.have.been.calledWith(OK)
  })
})
