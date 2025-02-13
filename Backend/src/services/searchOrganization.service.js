const express = require("express")
const { findOrganization } = require("../repositories/searchOrganization.repository.js")

async function searchOrganizationService() {

    // console.log("register service : ", organizationDetails)

    const organization = await findOrganization()

    if (!organization) {
        throw new Error("No organizations Found");
    }

    console.log("organizations  ->>>>!! (in searchOrganization.service.js)")
    return organization
}



module.exports = {
    searchOrganizationService
}

