const { loginTeacherService } = require("../../services/teacher/teacherLogin.service.js");

async function loginTeacherController(req, res) {
    try {
        const result = await loginTeacherService(req.body);
        
        // Set token in HTTP-only cookie
        res.cookie('accessToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            teacher: result.teacher
        });
        
    } catch(error) {
        console.log("controller Login Error : ", error);
        return res.status(error.statusCode || 500).json({ 
            success: false,
            message: error.reason || "Login failed",
            error: error
        });
    }
}

module.exports = {
    loginTeacherController
}