const express = require("express")
const router = express.Router();
const app = express()
const cors = require('cors');
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

//change this when deployng
require('dotenv').config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/eccomerce", {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error", console.error.bind(console, 'error in the connection:'))
db.once('open',()=>{
    console.log('connected')
})
app.use("/api",require("../routes/routes"))
app.use("/api",require("../routes/register"))
app.use("/api",require("../routes/mercadoPago"))
app.listen("5000", ()=>{console.log("running in port 5000")})
