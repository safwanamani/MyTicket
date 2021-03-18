const TotalTicket = require('../models/totalTickets');
const BookedTicket = require('../models/bookedTicket');

//Add Total tickets
exports.AddTickets = (req, res) => {
    TotalTicket.find((err) => {
        if (err) {
            res.status(400).json(err);
        } else {
            const totalTicket = new TotalTicket(req.body);

            totalTicket.save()
                .then(data => {
                    res.status(200).json(data);
                }).catch(err => {
                    res.status(400).json(err);
                })
        }
    })
};

//Get Total Tickets
exports.GetTotalTickets = (req, res) => {
    TotalTicket.find((err, amount) => {
        if (amount) {
            res.status(200).json(amount)
        } else {
            res.status(400).json(err)
        }
    });
};

//Book Tickets
exports.BookTicket = (req, res) => {
    TotalTicket.findOne({ name: 'total' }, (err, data) => {
        if (data) {
            if (data.totalTickets >= req.body.bookedTicket) {
                const newTotal = data.totalTickets - req.body.bookedTicket;
                data.totalTickets = newTotal;

                data.save()
                    .then(total => {
                        BookedTicket.findOne({ name: "booked" }, (err, ticket) => {
                            if (ticket) {
                                const newBooked = ticket.bookedTicket + Number(req.body.bookedTicket);
                                ticket.bookedTicket = newBooked;

                                ticket.save()
                                    .then(booked => {
                                        res.status(200).json({ total, booked });
                                    }).catch(err => {
                                        res.status(400).json(err);
                                    });
                            } else if (!ticket) {
                                const _booked = new BookedTicket(req.body);

                                _booked.save()
                                    .then(booked => {
                                        res.status(200).json({ total, booked });
                                    }).catch(err => {
                                        res.status(400).json(err);
                                    })
                            } else {
                                res.status(400).json(err);
                            }
                        })
                    }).catch(err => {
                        res.status(400).json(err);
                    })
            } else {
                res.status(404).json("Declined");
            }
        } else {
            res.status(400).json(err);
        }
    });
};

//Get Total of Booked Tickets
exports.GetBookedTickets = (req, res) => {
    BookedTicket.find((err, count) => {
        if (count) {
            res.status(200).json(count)
        } else {
            res.status(400).json(err)
        }
    })
};

//Cancel the Booked Tickets
exports.CancelTicket = (req, res) => {
    BookedTicket.findOne({ name: "booked" }, (err, ticket) => {
        if (ticket) {
            if (ticket.bookedTicket >= req.body.cancelTicket) {
                const newBooked = ticket.bookedTicket - req.body.cancelTicket;

                ticket.bookedTicket = newBooked;

                ticket.save()
                    .then(newBook => {
                        TotalTicket.findOne({ name: "total" }, (err, total) => {
                            if (total) {
                                const newTotal = total.totalTickets + Number(req.body.cancelTicket);

                                total.totalTickets = newTotal;

                                total.save()
                                    .then(newtotal => {
                                        res.status(200).json({ newtotal, newBook });
                                    }).catch(err => {
                                        res.status(400).json(err);
                                    })
                            } else {
                                res.status(400).json(err);
                            }
                        })
                    }).catch(error => {
                        res.status(400).json(error);
                    })
            } else {
                res.status(404).json("Declined")
            }
        }
    })
};
