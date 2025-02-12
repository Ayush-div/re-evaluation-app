const express = require("express")
// import findOrganization from '../repositories/organizationRegister.repository'
const { findOrganization } = require("../repositories/organizationRegister.repository.js")
const { createOrganization } = require("../repositories/organizationRegister.repository.js")

async function registerOrganizationService(organizationDetails) {
    // console.log("register service : ", organizationDetails)

    const organization = await findOrganization({
        orgName: organizationDetails.orgName,
        orgLocation: organizationDetails.orgLocation,
    })
    
    if (organization) {
        throw { reason: "Organization already exists", statuscode: 400 }
    }


    const newOrganization = await createOrganization({
        orgName: organizationDetails.orgName,
        orgLocation: organizationDetails.orgLocation,
        departments: organizationDetails.departments,
        noOfStudents: organizationDetails.noOfStudents,
        organisationEmail: organizationDetails.organisationEmail,
        bankDetails: organizationDetails.bankDetails,
        organizaitonWebsite: organizationDetails.organizaitonWebsite,
        contactPerson: organizationDetails.contactPerson,
        verificationDetails: ""
    });


    console.log("new organization created!! (in regsiterOrganization.service.js)")


    // if (newOrganization.Field == 'orgName') {
    //     throw { reason: "Please enter correct email", statusCode: 500 }
    // }
    // else if (newOrganization.Field == 'orgLocation') {
    //     throw { reason: "Please enter correct rollNumber", statusCode: 500 }
    // }

    if (!newOrganization) {
        throw { reason: "Internal Server Error, Not able to Register", statusCode: 500 }
    }

    return newOrganization
}



module.exports = {
    registerOrganizationService
}

