import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import server from '../server'

chai.use(chaiHttp)

describe('Base Route', () => {
  it('Should return 200 OK, on hitting Base Route.', async (): Promise<any> => {
    const res = await chai.request(server).get('/')

    expect(res).to.have.status(200)
  })

  it('Should return 200 OK, on hitting Base Route with no PORT on NODE_ENV', async (): Promise<any> => {
    process.env.PORT = undefined

    const res = await chai.request(server).get('/')

    expect(res).to.have.status(200)
  })
})
