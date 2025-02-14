const { registerAdminTeacher } = require("../services/addTeacherAdmin.service.js");

async function addAdminTeacher(req, res) {
    try {

        const response = await registerAdminTeacher(req.body);
        return res.json({
            message: "successfully Added teacher in adminTeacherController file",
            Success: true,
            data: response,
            statusCode: 201,
            error: {}
        })
    } catch (error) {
        console.log("ERROR : Hii there in adminTeacher.controller.js file : ", error)
        res.json({ // .status(error.statusCode)
            message: error.reason,
            Success: false,
            statusCode: error.statusCode,
            data: {},
            error: error
        })
    }

}

module.exports = {
    addAdminTeacher
}