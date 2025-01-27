const mongoose = require('mongoose');
const serverConfig = require('./serverConfig.js');


// the below fucntion help us to connect to a mongodb server 
async function connectDB(){
    try{
        // await mongoose.connect(serverConfig.DB_URL);
        await mongoose.connect("mongodb+srv://Ayush:JNLLuEt3bUVEr3tv@cluster0.v5uie.mongodb.net/");
        console.log("Successfully connected to the mongodb server...");
    } catch(error){
        console.log("Not able to connect mongodb server...");
        console.log(error)
    }

}

module.exports = connectDB;