require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGO_DB = process.env.MONGO_DB;
const PORT = process.env.PORT;
//routes
const authRoutes = require('./routes/auth');

const app = express();

//MongoDB Connection
mongoose.connect("mongodb+srv://" + MONGODB_USER + ":" + MONGODB_PASSWORD + "@cluster0.hhqmm.mongodb.net/myFirstDatabase?retryWrites=true/" + MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully");
});

app.use(cors());
app.use(bodyParser.json());
app.use("/myticket", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});