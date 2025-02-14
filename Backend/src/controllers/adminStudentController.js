const { registerAdminStudent } = require("../services/adminStudentService");

async function addAdminStudent(req, res) {
    try {
        // console.log("Ayush Divedi : ", req.body)
        const response = await registerAdminStudent(req.body);
        return res.json({
            message: "successfully Added student in adminStudentController file",
            Success: true,
            data: response,
            statusCode: 201,
            error: {}
        })
    } catch (error) {
        console.log("Hii there in adminStudentController.js file : ", error)
        console.log("hello the error.reason is -> ", error.reason)
        res.json({
            message: error.reason,
            Success: false,
            statusCode: error.statusCode,
            data: {},
            error: error
        })
    }

}

module.exports = {
    addAdminStudent
}