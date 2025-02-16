const { loginStudent } = require("../services/studentLoginService");
const jwt = require('jsonwebtoken');

async function LoginStudent(req, res) {
    try {
        const student = await loginStudent(req.body);
        // Create access token
        const accessToken = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY || '1h' }
        );

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: {
                student: {
                    id: student._id,
                    name: student.studentName,
                    email: student.email,
                    organization: student.organizationId
                },
                accessToken // Changed from token to accessToken
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(401).json({
            success: false,
            message: error.message || "Login failed",
            error: error
        });
    }
}

module.exports = {
    LoginStudent
};