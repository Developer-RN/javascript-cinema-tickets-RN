import app from '../../src/app.js'
const request = require('supertest')

describe('Test order tickets POST endpoint', () => {
  describe('When request is valid', () => {
    it('should get status code 200 and corectly calculated values', async () => {
      const res = await request(app).post('/purchasetickets')
        .send(validRequest)
      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({ amountPaid: 70, seatsAllocated: 5, ticketsPurchased: 7 })
    })
  })

  describe('When request is not valid', () => {
    it('should get status code 500 and error message - Children or Infant tickets must be purchased together with an Adult ticket.', async () => {
      const res = await request(app).post('/purchasetickets')
        .send(onlyChilderenTicketsOrdered)
      expect(res.statusCode).toEqual(500)
      expect(res.body).toEqual({
        status: 500,
        message: 'Children or Infant tickets must be purchased together with an Adult ticket.'
      })
    })

    it('should get status code 500 and error message - Number of Infant tickets must not exceed number of Adult tickets.', async () => {
      const res = await request(app).post('/purchasetickets')
        .send(infantTicketsMoreThatAdultTickets)
      expect(res.statusCode).toEqual(500)
      expect(res.body).toEqual({
        status: 500,
        message: 'Number of Infant tickets must not exceed number of Adult tickets.'
      })
    })

    it('should get status code 500 and  error message - AccountId is not valid. ', async () => {
      const res = await request(app).post('/purchasetickets')
        .send(invalidId)
      expect(res.statusCode).toEqual(500)
      expect(res.body).toEqual({
        status: 500,
        message: 'AccountId is not valid.'
      })
    })
  })
})

const validRequest = {
  accountId: 2,
  ticketTypeRequests: [
    {
      type: 'ADULT',
      amount: 2
    },
    {
      type: 'CHILD',
      amount: 3
    },
    {
      type: 'INFANT',
      amount: 2
    }
  ]
}

const onlyChilderenTicketsOrdered = {
  accountId: 2,
  ticketTypeRequests: [
    {
      type: 'CHILD',
      amount: 3
    }
  ]
}

const infantTicketsMoreThatAdultTickets = {
  accountId: 2,
  ticketTypeRequests: [
    {
      type: 'ADULT',
      amount: 3
    },
    {
      type: 'INFANT',
      amount: 5
    }
  ]
}

const invalidId = {
  accountId: -2,
  ticketTypeRequests: [
    {
      type: 'ADULT',
      amount: 3
    },
    {
      type: 'INFANT',
      amount: 5
    }
  ]
}
