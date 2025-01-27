const express = require('express')
// const bodyParser = require('body-parser'); // in place of this we can also we express.json(), ...
const serverConfig = require('./config/serverConfig.js')
const connectDB = require('./config/dbConfig.js');


const app = express()


// app.use(bodyParser.json()); // acts as middleware -> it reads data which is coming into json form
// app.use(bodyParser.text()); // reads data which is present in test form
// app.use(bodyParser.urlencoded());

// NOTE : express server by default req.body ko parse nhi kr paata  thats why we need middleware parsers

app.use(express.json()); // acts as middleware -> it reads data which is coming into json form
app.use(express.text()); // reads data which is present in test form
app.use(express.urlencoded({ extended : true }));



app.get('/',(req,res)=>{
    res.send("Hello World!!");
})

app.post('/ping', (req,res)=>{
    // console.log(req.body); prints undefined to correct it we have to use middlewares like express.json(), express.text(), .... 
    console.log(req.body);
    return res.json({message : 'pong'}); 
})
app.listen((serverConfig.PORT),async () => {
    await connectDB();
    console.log(`server started at PORT ${serverConfig.PORT}`)
})