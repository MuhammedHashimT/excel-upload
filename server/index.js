const express = require("express")
const connectDB = require('./db/connection')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config();

// set up server
const app = express()
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// app.use
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cookieParser());

// connect to database
connectDB()

// set up routes
app.use("/api/auth", require("./routers/user.router"))