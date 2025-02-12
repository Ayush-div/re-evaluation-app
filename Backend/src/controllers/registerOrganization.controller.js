const express = require("express")
const { registerOrganizationService } = require("../services/registerOrganization.service.js")

async function registerOrganization(req, res) {
    console.log("hello from controller.js");

    console.log(req.body);
    try {
        const response = await registerOrganizationService(req.body);
        console.log("response from regsiterOrg.controller.js")
        console.log(response)
        return res.json({
            message: "successfully registered the organization",
            Success: true,
            data: response,
            statusCode: 201,
            error: {}
        });
    } catch (error) {
        console.log("error from registerOrganization.controller.js")
        console.log(error)
        res.json({
            message: error.reason,
            Success: false,
            data: {},
            error: error,
            statusCode: error.statusCode
        });
    }
}

module.exports = {
    registerOrganization
}