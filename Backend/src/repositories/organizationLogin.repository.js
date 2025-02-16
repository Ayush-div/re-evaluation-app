const { Organization } = require("../schema/organization/organizationSchema.js")

async function findOrganizationRepo(emailData) {
    try {
        const email = (typeof emailData === 'object' ? emailData.organizationEmail : emailData).trim();

        const response = await Organization.findOne({ organizationEmail: email });

        console.log("response:", response);
        return response;
    } catch (error) {
        console.error("Error in findOrganizationRepo:", error);
        throw error;
    }
}

module.exports = {
    findOrganizationRepo
}