import chai, { expect, request } from 'chai'
import chaiHttp from 'chai-http'
import server from '../../../server'
import { user1Token, user2Token, productParams } from './__mocks__/product'

chai.use(chaiHttp)

const endpoint = '/api/products'
let productId: string

const productProperties = [
  'id',
  'productName',
  'countyId',
  'userId',
  'description',
  'price',
  'photos',
  'categoryId',
  'createdAt',
  'updatedAt',
  'quantity',
]

describe('Test /api/products/ endpoint', (): void => {
  it('should successfully upload a new product', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .post(endpoint)
      .set('authorization', `Bearer ${user1Token}`)
      .send(productParams)
    expect(response.status).to.equal(201)
    const { product } = response.body
    productId = product.id
    expect(product).to.have.keys(...productProperties)
  })

  it('should successfully retrieve all products', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get(endpoint)
      .set('authorization', `Bearer ${user1Token}`)
    expect(response.status).to.equal(200)
    expect(response.body.products[0]).to.have.keys(...productProperties)
  })

  it('should successfully retrieve a single product', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get(`${endpoint}/${productId}`)
      .set('authorization', `Bearer ${user1Token}`)
    expect(response.status).to.equal(200)
    expect(response.body.product).to.have.keys(...productProperties)
  })

  it('should return a 401 if unauthorized user tries to update', async (): Promise<any> => {
    const updateParams = {
      productName: 'Updated Product Name',
      price: 20000,
    }
    const response = await chai
      .request(server)
      .put(`${endpoint}/${productId}`)
      .set('authorization', `Bearer ${user2Token}`)
      .send(updateParams)
    expect(response.status).to.equal(401)
    expect(response.body.message).to.equal('Unauthorized access')
  })

  it('should return a 401 if unauthorized user tries to delete', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .delete(`${endpoint}/${productId}`)
      .set('authorization', `Bearer ${user2Token}`)
    expect(response.status).to.equal(401)
    expect(response.body.message).to.equal('Unauthorized access')
  })

  it('should successfully update a single product', async (): Promise<any> => {
    const updateParams = {
      productName: 'Updated Product Name',
      price: 20000,
    }
    const response = await chai
      .request(server)
      .put(`${endpoint}/${productId}`)
      .set('authorization', `Bearer ${user1Token}`)
      .send(updateParams)
    expect(response.status).to.equal(200)
    expect(response.body.product).to.have.keys(...productProperties)
    expect(response.body.product.productName).to.equal(updateParams.productName)
    expect(response.body.product.price).to.equal(updateParams.price)
  })

  it('should successfully delete a single product', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .delete(`${endpoint}/${productId}`)
      .set('authorization', `Bearer ${user1Token}`)
    expect(response.status).to.equal(204)
  })
})

describe('Test /api/products/ error handling', (): void => {
  it('should return a 400 if product id is invalid', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get(`${endpoint}/567`)
      .set('authorization', `Bearer ${user1Token}`)
    expect(response.status).to.equal(400)
    expect(response.body.message).to.equal('Bad Request')
  })

  it('should return 404 if product is not found while retrieving', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get(`${endpoint}/b2ad92ed-49c9-45bc-920e-d091f389a236`)
      .set('authorization', `Bearer ${user1Token}`)
    expect(response.status).to.equal(404)
    expect(response.body.message).to.equal('Product was not found')
  })

  it('should return 404 if product is not found while updating', async (): Promise<any> => {
    const updateParams = {
      productName: 'Updated Product Name',
      price: 20000,
    }
    const response = await chai
      .request(server)
      .put(`${endpoint}/b2ad92ed-49c9-45bc-920e-d091f389a236`)
      .set('authorization', `Bearer ${user1Token}`)
      .send(updateParams)

    expect(response.status).to.equal(404)
    expect(response.body.message).to.equal('Product was not found')
  })

  it('should return 404 if product is not found while deleting', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .delete(`${endpoint}/b2ad92ed-49c9-45bc-920e-d091f389a236`)
      .set('authorization', `Bearer ${user1Token}`)
    expect(response.status).to.equal(404)
    expect(response.body.message).to.equal('Product was not found')
  })
})
