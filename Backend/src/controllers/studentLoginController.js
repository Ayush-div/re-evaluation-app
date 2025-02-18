const { loginStudent } = require("../services/studentLoginService");

async function LoginStudent(req, res) {
    try {
        const result = await loginStudent(req.body);
        
        res.cookie('accessToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            student: result.student 
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(401).json({
            success: false,
            message: error.reason || "Login failed"
        });
    }
}

module.exports = { LoginStudent };