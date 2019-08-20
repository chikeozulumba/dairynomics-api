import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { token } from './mockdata/mockData'

import server from '../../../server'
import db from '../../../database/models'
chai.use(chaiHttp)

describe('invoices endpoints', () => {
  beforeEach(async () => {
    await db.Invoice.create({
      userId: 2298,
      invoiceNumber: '#2567',
      amoutToBePaid: 5000,
      orderId: 'c9cf83aa-f7fb-4385-b861-411311a7eb3e',
      paymentStatus: 'pending',
    })
  })
  it('should be able to view all the invoices in the system', async () => {
    const data = await db.Invoice.findAll({ where: { userId: 2298 } })
    chai
      .request(server)
      .get('/api/invoices')
      .set('Authorization', token)
      .end((errors, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.meta.page).to.equal(1)
      })
  })
  it('should test  able to get a single items from the invoices', async () => {
    const data = await db.Invoice.findAll({ where: { userId: 2298 } })
    chai
      .request(server)
      .get(`/api/invoices/${data[0]['id']}`)
      .set('Authorization', token)
      .end((errors, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.invoice.amoutToBePaid).to.equal('5000')
      })
  })
  it('should  test invoices does not exist when you enter a wrong invoice number', async () => {
    chai
      .request(server)
      .get(`/api/invoices/c9cf83aa-f7fb-4385-b861-411311a7eb3e/`)
      .set('Authorization', token)
      .end((errors, res) => {
        expect(res.status).to.equal(400)
        expect(res.body.message).to.equal('record with this c9cf83aa-f7fb-4385-b861-411311a7eb3e does not exist')
      })
  })
  it('should be able to update an invoices ', async () => {
    const data = await db.Invoice.findAll({ where: { userId: 2298 } })
    chai
      .request(server)
      .put(`/api/invoices/${data[0]['id']}`)
      .set('Authorization', token)
      .send({ paymentStatus: 'paid' })
      .end((error, res) => {
        expect(res.status).to.equal(200)
      })
  })
})
