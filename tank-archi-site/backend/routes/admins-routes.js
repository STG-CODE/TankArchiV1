//!(Important Note:) the hierarchy matters for paths in the code!
//(NOTE):In the route files we register our middle ware that is responsible for
// handling the routes.

//(NOTE):express is needed for express imports
const express = require('express');

//(NOTE):here we import our express validator for checking incoming information
const { check } = require('express-validator')

//our controller imports
const adminsControllers = require('../controllers/admins-controllers');
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

//custom error message and code import
const HttpError = require('../models/http-error-model')

//(NOTE):the "Router()" is a special object on which we can register our middleware, and then export our configured 
//router and import it at our server and then register it as one singe middle ware in "server.js" 
const router = express.Router();

//here we use this pointers to point to the needed functions

//check auth before routing
router.use(checkAuth);

//gets us all the users
router.get('/', adminsControllers.getUsers);

//!Note that "uid" is a var at the controller part of the route function
//(get user by id)
router.get('/EditUser/:uid',



 adminsControllers.getUserById
);

//(get admin information)//TODO : need to implement
// router.get('/MainPage/Admin/:uid',usersController.getUserById);

//(NOTE): we use the given "express-validator" functions for validating information before it is passed on 
// to our create controller function which in this case is the "createUser" function
//(create a user)(NOTE : we use the "check()" function here with its sub functions to check the passing data)
router.post(
 '/',
 fileUpload.single('imagePfp'),
 check('username').not().isEmpty(),
 adminsControllers.createUser
);

//! //TODO:implement here the same check functions accordingly for practice!!!(also do at the users routes)
//((update a user information(used by admin))//TODO : need to implement
router.patch('/EditUser/:uid',
 fileUpload.single('imagePfp'),
 check('username').not().isEmpty(),
 adminsControllers.updateUser
);

//(delete a user(used by admin))
router.delete('/:uid', adminsControllers.deleteUser);

module.exports = router;