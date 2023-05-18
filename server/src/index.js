const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");   // logging library,it is important when user make certain requests to endpoints, either endpoint fail or worked how long does endpoint take to run
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");

const app = express();
app.use(express.json());    // in order to process json requests, you have to set this middleware function.
app.use(cors());
app.use(morgan("tiny"));

app.use(router);

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(`starting on port 8080`)
    app.listen(8080);
});

