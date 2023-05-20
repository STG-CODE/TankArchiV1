const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error-model');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];//Authorization: "Bearer TOKEN"
        console.log("Token ID = " + token.userId);
        console.log("Token EMAIL = " + token.email);
        if(!token){
            throw new Error('Authentication Failed!');
        }
        const decodedToken = jwt.verify(token,'cultured_tanker_token');
        req.userData = {usedId: decodedToken.userId};
        req.adminState = {isAdmin: decodedToken.isAdmin};
        next();
    } catch (err) {
        const errorMessage = new HttpError('Authentication Failed!',401);
        return next(errorMessage);
    }
};