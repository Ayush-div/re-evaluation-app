const serverConfig = require("../../config/serverConfig");
const { findTeacher } = require("../../repositories/teacher/teacherLogin.repository.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Teacher } = require("../../schema/teacher/teacher.schema.js")

async function loginTeacherService(teacherDetails) {
    // Find student and populate organization data
    try {
        const { email, password } = teacherDetails;

        const teacher = await Teacher.findOne({ email })
            .populate('organizationId', 'name email _id')
            .select('+password');

        if (!teacher) {
            throw { reason: "teacher not found" };
        }

        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            throw { reason: "Invalid password" };
        }

        // Create token
        const token = jwt.sign(
            { id: teacher._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        const teacherData = teacher.toObject();
        delete teacherData.password;
        console.log("this is teacherdata")
        console.log(teacherData)
        return {
            token,
            teacher: teacherData // Now includes populated organization data
        };
    }
    catch (error) {
        console.error('Login service error:', error);
        throw error;
    }

}



// const { email, password } = teacherDetails;

// const teacher = await findTeacher({ email });
// console.log("Service login: ", teacher);

// if (!teacher) {
//     throw { reason: "Teacher not found with given email", statusCode: 404 };
// }

// const isPasswordValid = await bcrypt.compare(password, teacher.password);
// if (!isPasswordValid) {
//     throw { reason: "Invalid password", statusCode: 401 };
// }

// const token = jwt.sign(
//     { 
//         id: teacher._id,
//         email: teacher.email,
//         role: 'teacher'
//     },
//     serverConfig.JWT_SECRET,
//     { expiresIn: serverConfig.JWT_EXPIRY }
// );

// return {
//     token,
//     teacher: {
//         id: teacher._id,
//         name: teacher.teacherName,
//         email: teacher.email,
//         department: teacher.department,
//         organization: teacher.organizationId
//     }
// };


module.exports = { loginTeacherService };