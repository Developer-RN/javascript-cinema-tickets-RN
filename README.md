# TicketService implementation

The Ticketservice is ticket purchase solution written in javascript using REST methadology. It provides capability to purchase tickets and it uses SeatReservationService and TicketPaymentService.



## Getting started

* Have **node js 16** or higher installed
* 'npm' version 6.X.X also should be installed
* if repositoy downladed using 'SSH' then Gitlab personal access token must be set up

1. install node modules

```bash
npm ci
```
2.  Testing

Run unit tets with coverage
```bash
npm run test:unit
```

Run integration tets with coverage
```bash
 npm run test:integration
```

Run Code Quality assesment - esLint
```bash
  npm run lint
```

Jest will also generate coverage folder under root directory wiht all the stats.

The application wil run on port 8080

Endpoint is POST "http://localhost:8080/purchasetickets"

Application accepts JSON format requests. Examples are show below.

Requests example

{
    "accountId": 2,
    "ticketTypeRequests": [
        {
            "type": "ADULT",
            "amount": 2
        },
        {
            "type": "CHILD",
            "amount": 3
        },
        {
            "type": "INFANT",
            "amount": 2
        }
    ]
}

response example

{
    "ticketsPurchased": 7,
    "seatsAllocated": 5,
    "amountPaid": 70
}

Curl command with valid request
```bash
 curl --location 'http://localhost:8080/purchasetickets' \
--header 'Content-Type: application/json' \
--data '{
    "accountId": 2,
    "ticketTypeRequests": [
        {
            "type": "ADULT",
            "amount": 2
        },
        {
            "type": "CHILD",
            "amount": 3
        },
        {
            "type": "INFANT",
            "amount": 2
        }
    ]
}'
```