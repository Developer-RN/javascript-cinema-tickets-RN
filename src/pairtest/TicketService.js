import InvalidPurchaseException from './lib/InvalidPurchaseException.js'
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js'
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js'

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets (accountId, ...ticketTypeRequests) {
    const MAX_NUMBER_OF_TICKETS = 20
    const ADULT_TIKCET_PRICE = 20
    const CHILD_TIKCET_PRICE = 10

    let purchasedTickets = 0
    let adultTickets = 0
    let childTickets = 0
    let infantTickets = 0

    if (accountId < 1) {
      throw new InvalidPurchaseException('AccountId is not valid.')
    }

    ticketTypeRequests.forEach(request => {
      if (request.getTicketType() === 'ADULT') {
        adultTickets += request.getNoOfTickets()
      }
      if (request.getTicketType() === 'CHILD') {
        childTickets += request.getNoOfTickets()
      }
      if (request.getTicketType() === 'INFANT') {
        infantTickets += request.getNoOfTickets()
      }
    })

    purchasedTickets = adultTickets + childTickets + infantTickets

    if (purchasedTickets === 0) {
      throw new InvalidPurchaseException('No tickets ordered.')
    }

    if (adultTickets === 0 & (childTickets + infantTickets) > 0) {
      throw new InvalidPurchaseException('Children or Infant tickets must be purchased together with an Adult ticket.')
    }
    if (adultTickets < infantTickets) {
      throw new InvalidPurchaseException('Number of Infant tickets must not exceed number of Adult tickets.')
    }

    if (purchasedTickets > 20) {
      throw new InvalidPurchaseException(`You are allowed to by up to ${MAX_NUMBER_OF_TICKETS} tickets only.`)
    }

    const amountToPay = adultTickets * ADULT_TIKCET_PRICE + childTickets * CHILD_TIKCET_PRICE
    const seatsAllocated = adultTickets + childTickets

    const ticketPaymentService = new TicketPaymentService()
    const seatsAllocationService = new SeatReservationService()

    ticketPaymentService.makePayment(accountId, amountToPay)
    seatsAllocationService.reserveSeat(accountId, seatsAllocated)

    return { purchasedTickets, amountPaid: amountToPay, seatsAllocated }
  }
}
