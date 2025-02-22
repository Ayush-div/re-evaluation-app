const serverConfig = require("../config/serverConfig");
const { Student } = require('../schema/student/studentSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginStudent = async ({ email, rollNumber, password }) => {
    try {
        // Find student and populate organization data
        console.log("here in the service")
        const student = await Student.findOne({ email, rollNumber })
            .populate('organizationId', 'name email _id')
            .select('+password');

        if (!student) {
            throw { reason: "Student not found" };
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            throw { reason: "Invalid password" };
        }

        // Create token
        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        const studentData = student.toObject();
        delete studentData.password;

        return {
            token,
            student: studentData // Now includes populated organization data
        };
    } catch (error) {
        console.error('Login service error:', error);
        throw error;
    }
};

module.exports = { loginStudent };