import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import nock from 'nock'
import * as faker from 'faker'
import app from '../../../server'
import token from '../__mocks__/data'
import * as statusCodes from '../../../constants/statusCodes'

chai.use(chaiHttp)
const appPrefix = '/api'
let productCategoryID: string
describe('Category CRUD', () => {
  it('should create a category', async () => {
    const result = await chai
      .request(app)
      .post(`${appPrefix}/categories`)
      .set('Authorization', token)
      .send({ name: faker.name.findName() })
    productCategoryID = result.body.productcategory.id
    expect(result.body.status).to.equal(statusCodes.CREATED)
    expect(result.body.productcategory).to.be.an('object')
  })

  it('should return all categories', async () => {
    const result = await chai
      .request(app)
      .get(`${appPrefix}/categories`)
      .set('Authorization', token)
      .send()
    expect(result.body.status).to.equal(statusCodes.OK)
    expect(result.body.productcategorys).to.be.an('array')
  })

  it('should update a category', async () => {
    const result = await chai
      .request(app)
      .put(`${appPrefix}/categories/${productCategoryID}`)
      .set('Authorization', token)
      .send({ description: faker.lorem.sentence() })
    expect(result.body.status).to.equal(statusCodes.OK)
    expect(result.body.productcategory).to.be.an('object')
  })

  it('should return body validation error on update a category', async () => {
    const result = await chai
      .request(app)
      .put(`${appPrefix}/categories/${productCategoryID}`)
      .set('Authorization', token)
      .send({ name: faker.lorem.paragraph() })
    expect(result.body.status).to.equal(statusCodes.BAD_REQUEST)
    expect(result.body.errors).to.be.an('array')
  })

  it('should return a single category', async () => {
    const result = await chai
      .request(app)
      .get(`${appPrefix}/categories/${productCategoryID}`)
      .set('Authorization', token)
      .send()
    expect(result.body.status).to.equal(statusCodes.OK)
    expect(result.body.productcategory).to.be.an('object')
  })

  it('should return a params error for viewing single category with invalid UUID', async () => {
    const result = await chai
      .request(app)
      .get(`${appPrefix}/categories/${productCategoryID}makeitinvalid`)
      .set('Authorization', token)
      .send()
    expect(result.body.status).to.equal(statusCodes.BAD_REQUEST)
    expect(result.body.errors).to.be.an('array')
  })

  it('should delete a category', async () => {
    const result = await chai
      .request(app)
      .delete(`${appPrefix}/categories/${productCategoryID}`)
      .set('Authorization', token)
      .send()
  })
})
