const express = require("express")
const { searchOrganization } = require("../controllers/searchOrganization.controller.js")
const searchOrganizationRouter = express.Router()

console.log("here in the router")
searchOrganizationRouter.get('/', (req, res, next) => {
    console.log('Router hit with method:', req.method);
    next();
}, searchOrganization);
module.exports = searchOrganizationRouter