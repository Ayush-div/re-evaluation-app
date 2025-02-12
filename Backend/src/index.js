const express = require('express')
const cookieParser = require('cookie-parser');
const serverConfig = require('./config/serverConfig.js')
const connectDB = require('./config/dbConfig.js');
const mongoose = require('mongoose');
const isLoggedIn = require('./validation/authValidator.js');
// const uploader = require('./middlewares/multerMiddlewares.js');
// const cloudinary = require('./config/cloudinaryConfig.js');
const fs = require('fs/promises');
const app = express()

app.use(cookieParser());
app.use(express.json()); 
app.use(express.text()); 
app.use(express.urlencoded({ extended : true }));

const studentRouter = require('./routes/studentRoute.js');
const adminRouter = require('./routes/adminRoute.js');
app.use('/api/students',studentRouter)
app.use('/api/organization',adminRouter) 
app.get('/api/test',isLoggedIn,(req,res)=>{
    res.json({message : 'OK'});
})

app.get('/',(req,res)=>{
    res.send("Hello World!!");
})


app.get('/ping', isLoggedIn, (req,res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message : 'pong'}); 
})

// app.post('/photo', uploader.single('incomingFile'), async (req,res)=>{
//     try{
//         if(!req.file){
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         console.log(req.file.path);
//     } catch(error){
//         console.log("ERROR : ", error)
//     }
    
// })
app.listen((serverConfig.PORT),async () => {
    await connectDB();
    console.log(`server started at PORT ${serverConfig.PORT}`)
    // const result = await cloudinary.uploader.upload(req.file.path /*, {resource_type: resourceType}*/);
    // console.log(result);
    // await fs.unlink(req.file.path)
    // return res.json({ message: 'OK', url: result.secure_url });
})
