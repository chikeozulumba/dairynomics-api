import jwt from 'jwt-simple'
import 'dotenv/config'

export const userId = 1923

const user1Object = {
  iss: process.env.COWSOKO_ISS,
  sub: userId,
}

const user2Object = { ...user1Object, sub: 1924 }

export const user1Token = jwt.encode(user1Object, 'TEST_SECRET')
export const user2Token = jwt.encode(user2Object, 'TEST_SECRET')

export const productParams = {
  productName: 'New Product Again',
  userId: 1923,
  categoryId: 2,
  countyId: 10,
  quantity: 10,
  description: 'A large tractor'.repeat(50),
  price: 30000,
  photos: ['image1.png', 'image2.png', 'image3.png'],
}
