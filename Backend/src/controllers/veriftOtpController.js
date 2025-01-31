const { VerifyOtp } = require("../services/otpService");

async function verifyOtp(req,res){
    console.log(req.body);
    try{
        const response = await VerifyOtp(req.body);
        console.log("Response is : ",response)
        console.log("Hello Ayush")
        return res.json({ // .status(201)
            message : "otp verified successfully",
            Success : true,
            data : response,
            statusCode: 201,
            error : {}
        })
    } catch(error){
        console.log("Hi  error i am ayush : ",error.message)
        res.json({ // .status(error.statusCode)
            message : error.message,
            Success : false,
            data : {},
            error : error,
            statusCode: error.statusCode
        })
    }
    
}

module.exports = {
    verifyOtp
}