
const { Organization } = require("../schema/organization/organizationRegisterSchema.js")
// const { Organization } = require("../schema/organization/organisationRegisterSchema.js")
async function findOrganization() {
    try {
        const response = await Organization.find();
        // console.log("find ORGANISATION RESPONSE")
        // console.log("response")
        // console.log(response)
        return response;
    } catch (error) {
        console.log("error in searchOrganization.repository.js")
        console.log(error)
    }
}


module.exports = {
    findOrganization
}