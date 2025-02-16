const { loginTeacherService } = require("../../services/teacher/teacherLogin.service.js");

async function loginTeacherController(req,res){
    console.log(req);
    try{
        console.log(req)
        const response = await loginTeacherService(req.body);
        res.cookie('authToken', response, {
            httpOnly: true,
            secure: false, 
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
        res.json({ 
            message : error.reason,
            Success : false,
            data : {},
            error : error
        })
    }
    
}

module.exports = {
    loginTeacherController
}