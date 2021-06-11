const express = require('express');
const cors= require('cors');
const app= express();
const connectToDatabase = require('./config/connectToDatabase');
require('dotenv').config();
const path =require('path')
// const connectToDatabase = require('./config/connectToDatabase'); //connect database mongoose

//Ket noi database
connectToDatabase();

// Goi Router
const router = require("./routers");

app.use(express.json({limit: '10mb', extended: true}))
app.use(express.urlencoded({limit: '10mb', extended: true}))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(express.json({extended: false}));
  router(app);
  if(process.env.NODE_ENV==='production'){
    //Trang thai file
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client/build','index.html'))
    })
  }

const PORT = process.env.PORT ||6001;

app.listen(PORT,()=> console.log(`Server running on port :${PORT}`))