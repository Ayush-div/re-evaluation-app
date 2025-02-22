const { loginStudent } = require("../services/studentLoginService");

const LoginStudent = async (req, res) => {
    try {
        const result = await loginStudent(req.body);
        console.log("here")
        console.log(result)
        // Set cookie
        res.cookie('accessToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Return student data including organization info
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            student: {
                ...result.student,
                organizationId: result.student.organizationId._id, // Ensure organizationId is included
                organizationName: result.student.organizationId.name // Optional: include org name
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

module.exports = { LoginStudent };