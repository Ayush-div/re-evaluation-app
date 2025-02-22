const { Organization } = require("../schema/organization/organizationSchema.js")

async function findOrganization(parameters) {
    try {
        const response = await Organization.findOne({ ...parameters });
        return response;
    } catch (error) {
        console.error("Error in findOrganization:", error);
        throw error;
    }
}

async function createOrganization(organizationDetails) {
    try {
        // Only include essential fields for organization creation
        const orgData = {
            orgName: organizationDetails.orgName,
            orgLocation: organizationDetails.orgLocation,
            organizationEmail: organizationDetails.organizationEmail,
            password: organizationDetails.password,
            bankDetails: organizationDetails.bankDetails,
            contactPerson: organizationDetails.contactPerson,
            department:organizationDetails.department,
            organizationWebsite: organizationDetails.organizationWebsite
        };

        const response = await Organization.create(orgData);
        console.log("Organization created successfully:", response._id);
        return response;
    } catch (error) {
        console.error("Error in createOrganization:", error);
        const errorCode = error?.code || error?.cause?.code;

        if (errorCode === 11000) {
            // Duplicate key error
            const duplicateKey = error?.cause?.keyValue || error?.keyValue;
            return { Field: Object.keys(duplicateKey)[0] };
        } 
        
        if (error.name === "ValidationError") {
            const validationErrors = Object.keys(error.errors).map(field => ({
                field,
                message: error.errors[field].message
            }));
            throw { reason: validationErrors[0].message };
        }
        
        throw error;
    }
}

module.exports = {
    findOrganization,
    createOrganization
}