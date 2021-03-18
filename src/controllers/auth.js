const TotalTicket = require('../models/totalTickets');

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