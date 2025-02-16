const mongoose = require('mongoose');
const serverConfig = require('./serverConfig.js');


// the below fucntion help us to connect to a mongodb server 
async function connectDB(){
    try{
        // console.log("Hii there")
        // console.log(serverConfig.DB_URL)

        // CHANGE THIS URL TO YOUR DATABASE URL
        // await mongoose.connect("mongodb+srv://Ayush:JNLLuEt3bUVEr3tv@cluster0.v5uie.mongodb.net/");

        // CHANGE THIS URL TO YOUR DATABASE URL
        // await mongoose.connect("mongodb+srv://srivastavadevansh123:a338ywDPkHD0kjhI@cluster0.82jim.mongodb.net/Devansh");

        // CHANGE THIS URL TO YOUR DATABASE URL
        await mongoose.connect("mongodb+srv://singhvigyat:JKJArZLwz0B72koI@cluster0.meri4.mongodb.net/Student");
        
        console.log("Successfully connected to the mongodb server...");
    } catch(error){
        console.log("Not able to connect mongodb server...");
        console.log(error)
    }

}

module.exports = connectDB;