const request = require('supertest');
import app from '../../src/app.js'

describe('Test order tickets POST endpoint', () => {
  describe ("When request is valid", () =>{
    it('should get status code 200 and corectly calculated values', async () => {
      const res = await request(app).post('/purchasetickets')
      .send(validRequest)
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({"ticketsPurchased": ""});
  });
  });

  const validRequest =  {
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
  };

});