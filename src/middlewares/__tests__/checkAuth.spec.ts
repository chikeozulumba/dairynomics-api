import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'
import { mockReq, mockRes } from 'sinon-express-mock'
import jwtDecode from 'jwt-decode'
import checkAuth, { checkIfAdmin } from '../checkAuth'
import { UNAUTHORIZED } from '../../constants/statusCodes'
import { token, externalToken, aToken } from './__mocks__/data'
chai.use(sinonChai)

describe('checkAuth', () => {
  it('should return `Unauthorized access` with no `Authorization`', done => {
    const request = {
      headers: {
        authorization: '',
      },
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    checkAuth(req, res, next).then(data => {
      expect(res.status).to.have.been.calledWith(UNAUTHORIZED)
      done()
    })
  })

  it('should return `Unauthorized access` with  `External token`', done => {
    const request = {
      headers: {
        authorization: externalToken,
      },
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    checkAuth(req, res, next).then(() => {
      expect(res.status).to.have.been.calledWith(UNAUTHORIZED)
      done()
    })
  })

  it('should return call `next` with `Valid token`', done => {
    const request = {
      headers: {
        authorization: token,
      },
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    checkAuth(req, res, next).then(data => {
      expect(next.called).to.be.true
      done()
    })
  })
})

describe('checkIfAdmin', () => {
  it('should return `Unauthorized access` with no `Authorization`', done => {
    const request = {
      currentUser: '',
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    checkIfAdmin(req, res, next).then(data => {
      expect(res.status).to.have.been.calledWith(UNAUTHORIZED)
      done()
    })
  })
  it('should call next if user is admin', done => {
    const request = { currentUser: { admin: 'admin' } }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()

    checkIfAdmin(req, res, next).then(data => {
      expect(next).to.have.been.called
      done()
    })
  })
})
