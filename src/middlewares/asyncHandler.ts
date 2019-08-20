import { SERVER_ERROR } from '../constants/statusCodes'

const asyncHandler = (cb: any) => async (req: any, res: any, next: any) => {
  try {
    await cb(req, res, next)
  } catch (err) {
    return res.status(err.status || SERVER_ERROR).json({
      status: SERVER_ERROR,
      message: err.message || err.data.errorMessage,
    })
  }
}

export default asyncHandler
