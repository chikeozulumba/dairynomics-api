import { expect } from 'chai'
import { formatDateToTimestamp } from '../payment.utils'

describe('Unit Tests for Utility Functions', () => {
  it('Should return a date in :YYYYMMDDHHMMSS format.', (done): void => {
    const formatedDate = formatDateToTimestamp(new Date())
    expect(typeof formatedDate).to.equal('string')
    done()
  })
})
