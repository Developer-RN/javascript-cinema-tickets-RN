import express from 'express'
import Ticketservice from '../pairtest/TicketService.js'
import addOrdersToArray from '../pairtest/lib/utils.js'
const router = express.Router()

router.post('/purchasetickets', function (req, res, next) {
  const accountId = req.body.accountId
  const ticketRequest = req.body.ticketTypeRequests
  const ticketservice = new Ticketservice()
  let response = null
  const listOfTicketOrdered = []

  addOrdersToArray(ticketRequest, listOfTicketOrdered)

  try {
    response = ticketservice.purchaseTickets(accountId, ...listOfTicketOrdered)
  } catch (err) {
    next(err)
  }

  res.send({ ticketsPurchased: response.purchasedTickets, seatsAllocated: response.seatsAllocated, amountPaid: response.amountPaid })
})

export default router
