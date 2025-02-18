const serverConfig = require("../../config/serverConfig");
const { findTeacher } = require("../../repositories/teacher/teacherLogin.repository.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginTeacherService(teacherDetails) {
    const { email, password } = teacherDetails;
    
    const teacher = await findTeacher({ email });
    console.log("Service login: ", teacher);

    if (!teacher) {
        throw { reason: "Teacher not found with given email", statusCode: 404 };
    }

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
        throw { reason: "Invalid password", statusCode: 401 };
    }

    const token = jwt.sign(
        { 
            id: teacher._id,
            email: teacher.email,
            role: 'teacher'
        },
        serverConfig.JWT_SECRET,
        { expiresIn: serverConfig.JWT_EXPIRY }
    );

    return {
        token,
        teacher: {
            id: teacher._id,
            name: teacher.teacherName,
            email: teacher.email,
            department: teacher.department,
            organization: teacher.organizationId
        }
    };
}

module.exports = { loginTeacherService };