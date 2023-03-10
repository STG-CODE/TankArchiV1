//(NOTE):In the route files we register our middle ware that is responsible for
// handling the routes.

//(NOTE):express is needed for express imports
const express = require('express');

//(NOTE):here we import our express validator for checking incoming information
const { check } = require('express-validator')

//our controller imports
const tanksControllers = require('../controllers/tanks-controllers');
const tankFilesUpload = require('../middleware/file-upload-tanks');

//custom error message and code import
const HttpError = require('../models/http-error-model')

//(NOTE):the "Router()" is a special object on which we can register our middleware, and then export our configured 
//router and import it at our server and then register it as one singe middle ware in "server.js" 
const router = express.Router();

//here we use this pointers to point to the needed functions

//(get all existing tanks)
router.get('/',tanksControllers.getTanks);

//(get tank by name)
router.get('/:tankName',tanksControllers.getTankByName);

//(get user information)
router.get('/EditTank/:tid',tanksControllers.getTankById);

//create a user
router.post('/',tanksControllers.createTank);

//update a tank
router.patch('/EditTank/:tid', tanksControllers.updateTank);

//
router.patch(
    '/UpdateTankPhotos/:tid', 
    tankFilesUpload.array('tankPhotoSet', 9),
    tanksControllers.updateTankPhotos
    );

//delete a user
router.delete('/:tid',tanksControllers.deleteTank);

module.exports = router;