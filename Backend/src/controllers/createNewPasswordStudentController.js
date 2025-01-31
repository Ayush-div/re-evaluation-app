const { loginStudent } = require("../services/studentLoginService");

async function LoginStudent(req,res){
    console.log(req);
    try{
        console.log(req)
        const response = await loginStudent(req.body);
        res.cookie('authToken', response, {
            httpOnly: true,
            secure: false, // if we use true then we can only access using https but if we use false then we use it in http also
            maxAge: 7*24*60*60*1000
        })
        
        return res.json({
            message : "Logged In successfully",
            data : response,
            error : {},
            success : true
        })
        
    } catch(error){
        console.log("controller Login Error : ",error)
        res.json({ // .status(error.statusCode)
            message : error.reason,
            Success : false,
            data : {},
            error : error
        })
    }
    
}

module.exports = {
    LoginStudent
}