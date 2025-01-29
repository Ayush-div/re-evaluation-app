const jwt = require('jsonwebtoken');
const  serverConfig  = require('../config/serverConfig');


async function isLoggedIn(req, res, next){
    const token = req.cookies['authToken'];
    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No auth token provided"
        })
    }
    // console.log(token);
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "Invalid token provided"
        })
    }

    // if reached here, then user is authenticated allow them to access the api

    console.log(decoded);
    req.student = { // client -> middleware -> controller
        email: decoded.email,
        id: decoded.id
    }
    
    next();
}

module.exports = isLoggedIn