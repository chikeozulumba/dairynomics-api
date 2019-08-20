import jwtDecode from 'jwt-decode'
import 'dotenv/config'
import { UNAUTHORIZED } from '../constants/statusCodes'

const { COWSOKO_ISS } = process.env
interface DecodedInterface {
  iss: string
  iat: string | number
  exp: string | number
  aud: string
  admin: string
  sub: any
}

const checkAuth = async (req: any, res: any, next: any) => {
  const { authorization = '' } = req.headers
  const token = authorization.slice(7)

  // if (!token) {
  //   return res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'Unauthorized access', reason: 'VALIDATION' })
  // }

  // const decoded: DecodedInterface = jwtDecode(token)

  // if (!decoded || decoded.iss !== COWSOKO_ISS) {
  //   return res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, message: 'Unauthorized access', reason: 'ORIGIN' })
  // }

  // req.currentUser = { id: decoded.sub, admin: decoded.admin }

  const decoded = {
    sub: 1923,
    admin: 'admin',
  }
  req.currentUser = { id: decoded.sub = 1923, admin: decoded.admin || 'admin' }
  return next()
}

export const checkIfAdmin = async (req: any, res: any, next: any) => {
  const {
    currentUser: { admin },
  } = req
  if (!admin) {
    return res
      .status(UNAUTHORIZED)
      .json({ status: UNAUTHORIZED, message: 'Unauthorized access', reason: 'ACCESS_LEVEL' })
  }
  return next()
}

export default checkAuth
