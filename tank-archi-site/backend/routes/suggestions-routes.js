//(NOTE):In the route files we register our middle ware that is responsible for
// handling the routes.

//(NOTE):express is needed for express imports
const express = require('express');

//(NOTE):here we import our express validator for checking incoming information
const { check } = require('express-validator')

//our controller imports
const suggestionsControllers = require('../controllers/suggestions-controllers');

//custom error message and code import
const HttpError = require('../models/http-error-model')

//(NOTE):the "Router()" is a special object on which we can register our middleware, and then export our configured 
//router and import it at our server and then register it as one singe middle ware in "server.js" 
const router = express.Router();

//here we use this pointers to point to the needed functions

//(get all suggestions)
router.get('/', suggestionsControllers.getSuggestions);

//(get all suggestions by common user id)
router.get('/:uid', suggestionsControllers.getSuggestionsByUserId);

//(get suggestion information by its id)
router.get('/EditSuggestion/:sid', suggestionsControllers.getSuggestionById);

//(create a user)
router.post('/', suggestionsControllers.createSuggestion);

//(update a tank)
router.patch('/EditSuggestion/:sid', suggestionsControllers.updateSuggestion);

//delete a user
router.delete('/:sid',suggestionsControllers.deleteSuggestion);

module.exports = router;