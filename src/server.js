require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT;
//routes
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/myticket", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});