import express from 'express';

let router = express.Router();

router.post('/purchasetickets', function(req, res, next){
res.send({"ticketsPurchased": "" });
});

export default router;