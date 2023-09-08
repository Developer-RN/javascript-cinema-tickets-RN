import TicketTypeRequest from './TicketTypeRequest.js'
import InvalidPurchaseException from './InvalidPurchaseException.js'

const addOrdersToArray = (ticketRequest, listOfTicketOrdered) => {
  let arrayIndex = 0
  if (ticketRequest === null) {
    throw new InvalidPurchaseException('The request is invalid.')
  }
  if (ticketRequest.length === 0) {
    throw new InvalidPurchaseException('The request is invalid.')
  }
  ticketRequest.forEach(element => {
    listOfTicketOrdered[arrayIndex] = new TicketTypeRequest(element.type, (element.amount))
    arrayIndex++
  })
}

export default addOrdersToArray
