import { Response } from 'express'

interface Meta {
  page: number
  pages: number
  total: number
  price?: number
}

interface Data {
  message?: string
  status: number
  res: Response
  meta?: Meta
  [x: string]: any
}

/**
 * @param  {Object} data
 * @param  {ServerResponse} res
 * @return {ServerResponse} Response
 */
const jsonResponse = (data: Data) => {
  return data.res.status(data.status).json({
    ...data,
    res: undefined,
  })
}

export default jsonResponse
