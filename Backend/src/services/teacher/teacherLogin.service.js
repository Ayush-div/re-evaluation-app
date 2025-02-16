const serverConfig = require("../../config/serverConfig");
const { findTeacher } = require("../../repositories/teacher/teacherLogin.repository.js")
const Teacher = require('../../schema/teacher/teacher.schema.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginTeacherService(teacherDetails) {
    const plainPassword = teacherDetails.password;
    const email = teacherDetails.email;
    console.log(plainPassword)
    console.log(email)
    const teacher = await findTeacher({ email });
    console.log("Service login : ", teacher)
    console.log(teacherDetails.email)

    if (!teacher) {
        throw { reason: "Teacher with given Email does not exists", statuscode: 400 }
    }
    const isPasswordValidated = await bcrypt.compare(plainPassword, teacher.password);

    if (!isPasswordValidated) {
        throw { reason: "Invalid Password, please try again", statusCode: 401 };
    }

    const token = jwt.sign({ email: Teacher.email, id: Teacher._id }, serverConfig.JWT_SECRET, { expiresIn: serverConfig.JWT_EXPIRY });
    return token

}



module.exports = {
    loginTeacherService
}