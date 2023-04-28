const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

require("colors");
//const connectDb = require('./config/config.js');
//dotanv.config();
//connectDb();
const connectDb = require("./config/config");
//dotenv config
dotanv.config();
//db config
connectDb();
//rest obj 
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"));

//routes 
app.get("/",(req,res)=>{
   res.send("heyyyy");
})
app.use("/api/items", require('./routes/itemsRoutes'));
app.use("/api/users",require('./routes/userRoutes'));
app.use("/api/bills",require("./routes/billRoutes"));

const PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log(`express connection ${PORT} .`);
})