const { organizationLoginService } = require("../services/organizationLogin.service.js");

const organizationLoginController = async (req, res) => {
    try {
        const result = await organizationLoginService(req.body);
        
        res.cookie('accessToken', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            organization: result.organization
        });
    } catch (error) {
        console.error("controller Login Error : ", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.reason || "Internal Server Error"
        });
    }
};

module.exports = { organizationLoginController };