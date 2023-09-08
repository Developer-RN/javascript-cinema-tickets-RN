import TicketService from '../../src/pairtest/TicketService'
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest'
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService'
import SeatReservationService from '../../src/thirdparty/seatbooking/SeatReservationService'

const ticketservice = new TicketService()
const ADDULT_TICKETS_ZERO = new TicketTypeRequest('ADULT', 0)
const ADDULT_TICKETS_TWO = new TicketTypeRequest('ADULT', 2)
const ADDULT_TICKETS_TEN = new TicketTypeRequest('ADULT', 10)
const CHILD_TICKETS_FIVE = new TicketTypeRequest('CHILD', 5)
const INFANT_TICKETS_THREE = new TicketTypeRequest('INFANT', 3)
let accountId = 0

beforeEach(() => {
  jest.clearAllMocks()
})

const mockMakePayment = jest.fn()
jest.mock('../../src/thirdparty/paymentgateway/TicketPaymentService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      makePayment: mockMakePayment
    }
  })
})

const mockReserveSeat = jest.fn()
jest.mock('../../src/thirdparty/seatbooking/SeatReservationService', () => {
  return jest.fn().mockImplementation(() => {
    return {
      reserveSeat: mockReserveSeat
    }
  })
})

describe('TicketService', () => {
  it('Throws exception if id is not valid', () => {
    expect(() => {
      ticketservice.purchaseTickets(accountId, ADDULT_TICKETS_TEN)
    }).toThrow('AccountId is not valid.')
  })

  it('Throws exception if more than 20 tickets ordered', () => {
    accountId = 1
    expect(() => {
      ticketservice.purchaseTickets(accountId, ADDULT_TICKETS_TEN, ADDULT_TICKETS_TEN, ADDULT_TICKETS_TEN)
    }).toThrow('You are allowed to by up to 20 tickets only.')
  })

  it('Throws exception if Child and infant tickets purchased without purchasing an Adult ticket', () => {
    expect(() => {
      ticketservice.purchaseTickets(accountId, CHILD_TICKETS_FIVE, INFANT_TICKETS_THREE)
    }).toThrow('Children or Infant tickets must be purchased together with an Adult ticket.')
  })

  it.each([
    [ADDULT_TICKETS_TWO, INFANT_TICKETS_THREE],
    [ADDULT_TICKETS_TWO, CHILD_TICKETS_FIVE, INFANT_TICKETS_THREE]
  ])('Throws exception if number of Infant tickets exceeds number of Adult tickets', (...ticketRequest) => {
    expect(() => {
      ticketservice.purchaseTickets(accountId, ...ticketRequest)
    }).toThrow('Number of Infant tickets must not exceed number of Adult tickets.')
  })

  it('Throws exception if no tickets ordered', () => {
    expect(() => {
      ticketservice.purchaseTickets(accountId, ADDULT_TICKETS_ZERO)
    }).toThrow('No tickets ordered.')
  })

  it.each(
    [
      [10, ADDULT_TICKETS_TEN],
      [12, ADDULT_TICKETS_TEN, ADDULT_TICKETS_TWO],
      [18, ADDULT_TICKETS_TEN, CHILD_TICKETS_FIVE, INFANT_TICKETS_THREE]
    ])('Calculates correct number of tickets purchased', (result, ...purchaseRequests) => {
    const response = ticketservice.purchaseTickets(accountId, ...purchaseRequests)
    expect(response).toHaveProperty('purchasedTickets')
    expect(response.purchasedTickets).toBe(result)
  })

  it.each(
    [
      [200, ADDULT_TICKETS_TEN],
      [240, ADDULT_TICKETS_TEN, ADDULT_TICKETS_TWO],
      [250, ADDULT_TICKETS_TEN, CHILD_TICKETS_FIVE, INFANT_TICKETS_THREE]
    ])('Calculates correct amount to be paid', (result, ...purchaseRequests) => {
    const response = ticketservice.purchaseTickets(accountId, ...purchaseRequests)
    expect(response).toHaveProperty('amountPaid')
    expect(response.amountPaid).toBe(result)
  })

  it.each(
    [
      [10, ADDULT_TICKETS_TEN],
      [12, ADDULT_TICKETS_TEN, ADDULT_TICKETS_TWO],
      [15, ADDULT_TICKETS_TEN, CHILD_TICKETS_FIVE, INFANT_TICKETS_THREE]
    ])('Calculates correct amount of allocated seats', (result, ...purchaseRequests) => {
    const response = ticketservice.purchaseTickets(accountId, ...purchaseRequests)
    expect(response).toHaveProperty('seatsAllocated')
    expect(response.seatsAllocated).toBe(result)
  })

  const ticketPaymentService = new TicketPaymentService()
  const seatReservationService = new SeatReservationService()

  it('Test function make payment has been called once', () => {
    ticketservice.purchaseTickets(accountId, ADDULT_TICKETS_TWO)
    expect(ticketPaymentService.makePayment).toHaveBeenCalledTimes(1)
  })

  it('Test function reserve seats has been called once', () => {
    ticketservice.purchaseTickets(accountId, ADDULT_TICKETS_TWO)
    expect(seatReservationService.reserveSeat).toHaveBeenCalledTimes(1)
  })
})
