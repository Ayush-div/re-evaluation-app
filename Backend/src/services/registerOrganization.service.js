const express = require("express")
// import findOrganization from '../repositories/organizationRegister.repository'
const { findOrganization } = require("../repositories/registerOrganization.repository.js")
const { createOrganization } = require("../repositories/registerOrganization.repository.js")

async function registerOrganizationService(organizationDetails) {
    // console.log("register service : ", organizationDetails)

    const organization = await findOrganization({
        orgName: organizationDetails.orgName,
        // orgLocation: organizationDetails.orgLocation,
        organizationEmail: organizationDetails.organizationEmail
    })

    if (organization) {
        throw { reason: "Organization already exists", statuscode: 400 }
    }


    const newOrganization = await createOrganization({
        orgName: organizationDetails.orgName,
        orgLocation: organizationDetails.orgLocation,
        departments: organizationDetails.departments,
        noOfStudents: organizationDetails.noOfStudents,
        organizationEmail: organizationDetails.organizationEmail,
        bankDetails: organizationDetails.bankDetails,
        organizaitonWebsite: organizationDetails.organizaitonWebsite,
        contactPerson: organizationDetails.contactPerson,
        verificationDetails: "",
        password: organizationDetails.password
    });


    console.log("new organization created!! (in regsiterOrganization.service.js)")


    if (newOrganization.Field == 'orgName') {
        throw { reason: "Organization With This Name Already Exist", statusCode: 500 }
    }
    if (newOrganization.Field == 'organizationEmail') {
        throw { reason: "Organization With This Email Already Exist", statusCode: 500 }
    }

    if (!newOrganization) {
        throw { reason: "Internal Server Error, Not able to Register", statusCode: 500 }
    }

    return newOrganization
}



module.exports = {
    registerOrganizationService
}

