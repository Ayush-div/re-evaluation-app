const mongoose = require('mongoose');
const serverConfig = require('./serverConfig.js');


// the below fucntion help us to connect to a mongodb server 
async function connectDB(){
    try{
        // await mongoose.connect(serverConfig.DB_URL);
        // change this url to your database URL 
        await mongoose.connect("mongodb+srv://singhvigyat:JKJArZLwz0B72koI@cluster0.meri4.mongodb.net/Student");
        console.log("Successfully connected to the mongodb server...");
    } catch(error){
        console.log("Not able to connect mongodb server...");
        console.log(error)
    }

}

module.exports = connectDB;