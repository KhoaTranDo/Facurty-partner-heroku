const express = require('express');
const cors= require('cors');
const app= express();
const connectToDatabase = require('./config/connectToDatabase');
require('dotenv').config();
// const connectToDatabase = require('./config/connectToDatabase'); //connect database mongoose

//Ket noi database
connectToDatabase();

// Goi Router
const router = require("./routers");

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(express.json({extended: false}));
app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  router(app);
const PORT = process.env.PORT ||6001;

app.listen(PORT,()=> console.log(`Server running on port :${PORT}`))