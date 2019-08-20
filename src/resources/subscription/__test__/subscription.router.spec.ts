import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { token } from './mockData'
import server from '../../../server'
import db from '../../../database/models'

chai.use(chaiHttp)

describe('Service provider subscription when no user records', (): void => {
  it('should get all the Service provider subscriptions ', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get('/api/subscriptions')
      .set('Authorization', token)
    expect(response.status).to.be.equal(200)
    expect(response.body.subscriptions).to.be.an('Array')
  })

  beforeEach(async () => {
    await db.Subscription.destroy({
      where: {},
      truncate: true,
    })
  })

  it('should return a message when fetching service provider that does not exist', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get('/api/subscriptions/user')
      .set('Authorization', token)
    expect(response.status).to.be.equal(404)
    expect(response.body.message).to.be.equal('You are not subscribed on the Dairynomics Platform')
  })

  it('should return a message when service provider that does not exist tries to unsubscribe', async (): Promise<
    any
  > => {
    const response = await chai
      .request(server)
      .delete('/api/subscriptions/user')
      .set('Authorization', token)
    expect(response.status).to.be.equal(404)
    expect(response.body.message).to.be.equal('You are not subscribed on the Dairynomics Platform')
  })

  it('should return a message when service provider that does not exist tries to upgrade', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .put('/api/subscriptions/user')
      .set('Authorization', token)
      .send({
        plan: 'bronze',
      })
    expect(response.status).to.be.equal(404)
    expect(response.body.message).to.be.equal('You are not subscribed on the Dairynomics Platform')
  })

  it('should create a Service provider subscription ', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .post('/api/subscriptions')
      .set('Authorization', token)
    expect(response.status).to.be.equal(201)
    expect(response.body.message).to.be.equal('You are subscribed on the Dairynomics Platform')
  })
})

describe('Service provider tests for existing user', (): void => {
  it('should return a message if service provider exists ', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .post('/api/subscriptions')
      .set('Authorization', token)
    expect(response.status).to.be.equal(200)
    expect(response.body.message).to.be.equal('User is already subscribed on the Dairynomics Platform')
  })

  it('should return an array of existing user', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .get('/api/subscriptions/user')
      .set('Authorization', token)
    expect(response.status).to.be.equal(200)
    expect(response.body.subscribed).to.be.an('Object')
  })

  it('should update the plan of an existing user to bronze', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .put('/api/subscriptions/user')
      .set('Authorization', token)
      .send({
        plan: 'bronze',
      })
    expect(response.status).to.be.equal(200)
    expect(response.body.message).to.be.equal('You have upgraded to the bronze plan')
  })

  it('should update the plan of an existing user to silver', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .put('/api/subscriptions/user')
      .set('Authorization', token)
      .send({
        plan: 'silver',
      })
    expect(response.status).to.be.equal(200)
    expect(response.body.message).to.be.equal('You have upgraded to the silver plan')
  })

  it('should update the plan of an existing user to gold', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .put('/api/subscriptions/user')
      .set('Authorization', token)
      .send({
        plan: 'gold',
      })
    expect(response.status).to.be.equal(200)
    expect(response.body.message).to.be.equal('You have upgraded to the gold plan')
  })

  it('should unsubscribe a service provider', async (): Promise<any> => {
    const response = await chai
      .request(server)
      .delete('/api/subscriptions/user')
      .set('Authorization', token)
    expect(response.status).to.be.equal(200)
    expect(response.body.message).to.be.equal('You have unsubscribed from the Dairynomics Platform')
  })
})
