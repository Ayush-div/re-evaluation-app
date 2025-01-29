const { registerStudent } = require("../services/studentRegisterService");

async function createStudent(req,res){
    console.log(req.body);
    try{
        const response = await registerStudent(req.body);
        console.log(response)
        return res.json({ // .status(201)
            message : "successfully resistered the user",
            Success : true,
            data : response,
            statusCode: 201,
            error : {}
        })
    } catch(error){
        res.json({ // .status(error.statusCode)
            message : error.reason,
            Success : false,
            data : {},
            error : error,
            statusCode: error.statusCode
        })
    }
    
}

module.exports = {
    createStudent
}