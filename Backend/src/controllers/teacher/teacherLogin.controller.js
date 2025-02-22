const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Organization } = require('../../schema/organization/organizationSchema.js');
const { loginTeacherService } = require("../../services/teacher/teacherLogin.service.js")
const loginTeacherController = async (req, res) => {
    try {
        console.log("in login controller")
        const result = await loginTeacherService(req.body);
        console.log("result is ")
        console.log(result)
        console.log(result.teacher)
        const payload = {
            id: result.teacher._id,
            organizationId: result.teacher.organizationId, // Include organization's id here
            department: result.teacher.department, // Add department to payload
            role: 'teacher'
        };
        console.log(payload)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        console.log(result);
        // Set cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            teacher: {
                ...result.teacher,
                organizationId: result.teacher.organizationId, // if populated
                organizationName: result.teacher.organization // Optional
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(401).json({
            success: false,
            message: error.reason || "Login failed"
        });
    }
};

module.exports = { loginTeacherController };