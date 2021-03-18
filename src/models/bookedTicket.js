const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "booked"
    },
    bookedTicket: Number,
    cancelTicket: Number
});

module.exports = mongoose.model("BookedTicket", ticketSchema);