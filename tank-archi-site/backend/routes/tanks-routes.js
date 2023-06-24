//(NOTE):In the route files we register our middle ware that is responsible for
// handling the routes.

//(NOTE):express is needed for express imports
const express = require('express');

//(NOTE):here we import our express validator for checking incoming information
const { check } = require('express-validator')

//our controller imports
const tanksControllers = require('../controllers/tanks-controllers');
const tankFilesUpload = require('../middleware/file-upload-tanks');
const tankProfileUpload = require('../middleware/file-upload-tank-pfp');
const checkAuth = require('../middleware/check-auth');

//custom error message and code import
const HttpError = require('../models/http-error-model')

//(NOTE):the "Router()" is a special object on which we can register our middleware, and then export our configured 
//router and import it at our server and then register it as one singe middle ware in "server.js" 
const router = express.Router();

//here we use this pointers to point to the needed functions

//(get all existing tanks)
router.get('/',tanksControllers.getTanks);

//(get names)
router.get('/getUniqueNames',tanksControllers.getUniqueNames);

//(get nations)
router.get('/getUniqueNations',tanksControllers.getUniqueNations);

//(get userNations)
router.get('/getAllUniqueUserNations',tanksControllers.getAllUniqueUserNations);

//(get combat roles)
router.get('/getUniqueCombatRoles',tanksControllers.getUniqueCombatRoles);

//(get eras)
router.get('/getUniqueEras',tanksControllers.getUniqueEras);

//(get service states)
router.get('/getUniqueServiceStates',tanksControllers.getUniqueServiceStates);

//(get generations)
router.get('/getUniqueGenerations',tanksControllers.getUniqueGenerations);

//(get tanks sorted by rankings)
router.get('/getTanksByRankings',tanksControllers.getTanksByRankings);

//(brings the tanks according to the page we are on)
router.get('/getSearchTanks',tanksControllers.getTanksSearchByPages)

//(searches for a tank)
router.get('/Search',tanksControllers.getTanksBySearch);

//(get three random tanks)
router.get('/GetThreeRandomTanks/:tid',tanksControllers.getThreeRandomTanks);

//(get nine random tanks)
router.get('/getNineRandomTanks',tanksControllers.getNineRandomTanks);

//(get tank by name)
// router.get('/:tankName',tanksControllers.getTankByName);

router.use(checkAuth);

//(get user information)
router.get('/EditTank/:tid',tanksControllers.getTankById);

//create a tank
router.post(
    '/',
    tankProfileUpload.single('tankImagePfp'),
    tanksControllers.createTank
);

//update a tank
router.patch(
    '/EditTank/:tid', 
    tankProfileUpload.single('tankImagePfp'),
    tanksControllers.updateTank
);

//update current tank's profile pic
router.patch(
    '/UpdateTankProfilePhoto/:tid',
    tankProfileUpload.single('tankImagePfp'),
    tanksControllers.updateTankProfilePhoto
);

//add photos to existing tank photo collection
router.patch(
    '/UpdateTankPhotos/:tid', 
    tankFilesUpload.array('tankPhotoSet', 9),
    tanksControllers.updateTankPhotos
);

//
router.patch(
    '/UpdateTankRating/:tid',
    tanksControllers.updateTankRating
);

router.post(
    '/AddTankLike/:tid',
    tanksControllers.addTankLike
);

router.delete(
    '/RemoveTankLike/:tid',
    tanksControllers.removeTankLike
);

//delete a user
router.delete(
    '/:tid',
    tanksControllers.deleteTank
);

module.exports = router;