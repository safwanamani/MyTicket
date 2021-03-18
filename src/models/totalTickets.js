const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "total"
    },
    totalTickets: Number
});

module.exports = mongoose.model("TotalTicket", ticketsSchema);