const serverConfig = require("../config/serverConfig");
const { findOrganizationRepo } = require("../repositories/organizationLogin.repository.js")
const { Organization } = require("../schema/organization/organizationSchema.js")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function organizationLoginService(organizationDetails) {
    console.log("org details are : ", organizationDetails);
    const plainPassword = organizationDetails.password;
    const email = organizationDetails.email;

    const organization = await findOrganizationRepo({ organizationEmail: email });
    console.log("Service login : ", organization);
    
    if (!organization) { 
        throw { reason: "organization with given Email does not exists", statuscode: 400 }
    }

    console.log("plain password is: ", plainPassword);
    console.log("organization db password is: ", organization.password);
    console.log("org email given is :", email)

    const isPasswordValidated = await bcrypt.compare(plainPassword, organization.password);

    if (!isPasswordValidated) {
        throw { reason: "Invalid Password, please try again", statusCode: 401 };
    }

    const token = jwt.sign(
        { 
            email: organization.organizationEmail, 
            id: organization._id 
        }, 
        serverConfig.JWT_SECRET, 
        { expiresIn: serverConfig.JWT_EXPIRY }
    );

    return {
        token,
        organization: {
            id: organization._id,
            email: organization.organizationEmail,
            name: organization.organizationName,
            // Add other needed organization fields here
        }
    };
}

module.exports = {
    organizationLoginService
}