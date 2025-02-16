const { organizationLoginService } = require("../services/organizationLogin.service.js")
async function organizationLoginController(req, res) {
    console.log(req);
    try {
        console.log(req)
        const response = await organizationLoginService(req.body);
        res.cookie('authToken', response, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({
            message: "Logged In successfully",
            data: response,
            error: {},
            success: true
        })

    } catch (error) {
        console.log("controller Login Error : ", error)
        res.json({
            message: error.reason,
            Success: false,
            data: {},
            error: error
        })
    }

}

module.exports = {
    organizationLoginController
}