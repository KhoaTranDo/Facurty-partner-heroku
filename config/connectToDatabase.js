const mongoose = require('mongoose');
const config = require('config')
require('dotenv').config();
//Ket noi database 
const connectToDatabase = async () =>{
    try{
        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING,
            {
                useCreateIndex:true,
                useFindAndModify:true,
                useUnifiedTopology:true,
                useNewUrlParser: true
            }
        )
        console.log("MongoDb is connected");
    }catch(error){
        console.log(error);
        process.exit(1)
        }
}

module.exports = connectToDatabase;