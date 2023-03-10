//(NOTE):In the route files we register our middle ware that is responsible for
// handling the routes.

//(NOTE):express is needed for express imports
const express = require('express');

//(NOTE):
const { check } = require('express-validator')

//our controller imports
const usersControllers = require('../controllers/users-controllers');
const fileUpload = require('../middleware/file-upload');

//custom error message and code import
const HttpError = require('../models/http-error-model');

//(NOTE):the "Router()" is a special object on which we can register our middleware, and then export our configured 
//router and import it at our server and then register it as one singe middle ware in "server.js" 
const router = express.Router();

//here we use this pointers to point to the needed functions

//?
router.get('/',usersControllers.getUsers);

//(this route is used for signing up)
router.post(
    '/Signup',
    [
        check('username').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min : 6})
    ]
    ,usersControllers.signup
    );

//(this route is used for logging in)
router.post('/Login',usersControllers.login);

router.patch('/UpdateDetails/:uid',usersControllers.updateUserDetails);

router.patch('/UpdateOptionalDetails/:uid',usersControllers.updateUserOptionalDetails)

router.patch(
    '/UpdateUserProfilePic/:uid',
    fileUpload.single('image'),
    usersControllers.updateUserProfilePic
);

module.exports = router;