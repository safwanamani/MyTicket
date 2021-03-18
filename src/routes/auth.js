const express = require('express');
const { GetTotalTickets, AddTickets, BookTicket, GetBookedTickets, CancelTicket } = require('../controllers/auth');
const router = express.Router();

router.get("/", GetTotalTickets);
router.get("/booked", GetBookedTickets);
router.post("/add", AddTickets);
router.post("/bookticket", BookTicket);
router.post("/cancelticket", CancelTicket);

module.exports = router;
