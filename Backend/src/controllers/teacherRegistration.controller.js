const { registerTeacher } = require("../services/teacherRegister.service.js")

async function createTeacher(req, res) {
    console.log("in controller");
    console.log(req.body);
    try {
        const response = await registerTeacher(req.body);
        console.log("here in teacherRegisterioncontroller.js")
        console.log(response)
        return res.json({
            message: "successfully resistered the user",
            Success: true,
            data: response,
            statusCode: 201,
            error: {}
        })
    } catch (error) {
        console.log("error is ", error)
        console.log("error from teacherRegisterioncontroller.js", error.statusCode)
        console.log("error from teacherRegisterioncontroller.js", error.reason)
        // console.log({
        //     message: error.reason,
        //     Success: false,
        //     data: {},
        //     error: error,
        //     statusCode: error.statusCode
        // })
        res.status(error.statusCode).json({
            message: error.reason,
            Success: false,
            data: {},
            error: error,
            // statusCode: error.statusCode
        })
    }

}

module.exports = {
    createTeacher
}