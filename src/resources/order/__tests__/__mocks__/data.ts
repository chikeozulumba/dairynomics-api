import { OrderAttributes } from '../../order.model'

export const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JldGEuY293c29rby5jb20vYXBpL3YxL2xvZ2luIiwiaWF0IjoxNTYwODY2NzYyLCJleHAiOjE1NjA5NTMxNjIsIm5iZiI6MTU2MDg2Njc2MiwianRpIjoidEdnM2NBMDM4eGdqN3BlSiIsInN1YiI6MTkyMywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsImlkIjoxOTIzfQ.PXJn0-N2lQxamojG6vkYfSoRGtwS7XKBnm00xJAvPIU'

export const externalToken =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjEzNTk0MjEsImV4cCI6MTU5Mjg5NTQyMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMTIzNCJ9.Tv3CyvylvGBv_wSBeMSAzzdG254bjYDZMzeCRfIZMmU'

export const userId = 1923
// export const productId = 1
export const productId = '351043bb-3460-4937-902c-e450ab2afc46'

export const createOrder: OrderAttributes = {
  quantity: 5,
  amount: 100000,
  comments:
    'JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.',
  userId,
  orderItems: [
    {
      quantity: 5,
      productId,
    },
    {
      quantity: 50,
      productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
    },
  ],
}

export const updateOrder: any = {
  status: 'aborted',
  quantity: 180,
  amount: 3650,
  comments:
    'Chlo is an ordinary girl, with a pretty ordinary life, but it all changes one day as she is taken along with several other people to live an abdl life with a daddy each, to which she unexpectedly falls heavily in love with, enjoy!.',
  orderItems: [
    {
      id: '77738bae-18e6-44bd-8237-9ccfede60829',
      productId,
      quantity: 3756,
    },
    {
      id: 'c06ae069-ba76-4e7d-9039-7e72523df8e7',
      productId: '2dc3cec6-f6a1-43d2-ac90-d22ea0897081',
      quantity: 19000,
    },
  ],
}
