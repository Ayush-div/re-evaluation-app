const { VerifyOtp } = require("../services/otpService");

async function verifyOtp(req,res){
    console.log(req.body);
    try{
        const response = await VerifyOtp(req.body);
        console.log(response)
        return res.json({ // .status(201)
            message : "otp verified successfully",
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
    verifyOtp
}