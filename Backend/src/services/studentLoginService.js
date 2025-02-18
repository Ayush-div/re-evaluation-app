const serverConfig = require("../config/serverConfig");
const { findStudent } = require("../repositories/studentLoginRepository")
const Student = require('../schema/student/studentSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginStudent(studentDetails) {
    const plainPassword = studentDetails.password;
    const email = studentDetails.email;
    const rollNumber = studentDetails.rollNumber;

    const student = await findStudent({ rollNumber, email });
    console.log("Service login : ", student)
    
    if (!student) { 
        throw { reason: "student with given rollno/Email does not exists", statuscode: 400 }
    }

    const isPasswordValidated = await bcrypt.compare(plainPassword, student.password);

    if (!isPasswordValidated) {
        throw { reason: "Invalid Password, please try again", statusCode: 401 };
    }

    const token = jwt.sign(
        { 
            email: student.email, 
            id: student._id,
            rollNumber: student.rollNumber 
        }, 
        serverConfig.JWT_SECRET, 
        { expiresIn: serverConfig.JWT_EXPIRY }
    );

    return {
        token,
        student: {
            id: student._id,
            email: student.email,
            name: student.studentName,
            rollNumber: student.rollNumber,
            organization: student.organizationId
        }
    };
}

module.exports = {
    loginStudent
}