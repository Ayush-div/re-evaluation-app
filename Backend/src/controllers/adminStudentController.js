const { registerAdminStudent } = require("../services/adminStudentService");

async function addAdminStudent(req,res){
    try{
        console.log("Ayush Divedi : ",req.body)
        const response = await registerAdminStudent(req.body);
        return res.json({ // .status(201)
            message : "successfully Added student",
            Success : true,
            data : response,
            statusCode: 201,
            error : {}
        })
    } catch(error){
        console.log("Hii there : ",error)
        res.json({ // .status(error.statusCode)
            message : error.reason,
            Success : false,
            statusCode: error.statusCode,
            data : {},
            error : error
        })
    }
    
}

module.exports = {
  addAdminStudent
}