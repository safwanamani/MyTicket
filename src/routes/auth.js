const express = require('express');
const { GetTotalTickets, AddTickets } = require('../controllers/auth');
const router = express.Router();

router.get("/", GetTotalTickets);
router.post("/add", AddTickets);

module.exports = router;
