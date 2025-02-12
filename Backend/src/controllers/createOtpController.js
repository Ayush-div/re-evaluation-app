const { CreateOtp } = require("../services/otpService");

async function createOtp(req,res){
    console.log(req.body);
    try{
        // console.log("DASH ADSH DASH : ", req.body)
        const response = await CreateOtp(req.body);
        // console.log("Response is : ",response)
        return res.json({ // .status(201)
            message : "Otp sent successfully",
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
    createOtp
}