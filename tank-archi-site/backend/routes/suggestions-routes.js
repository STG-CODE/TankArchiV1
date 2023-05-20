//(NOTE):In the route files we register our middle ware that is responsible for
// handling the routes.

//(NOTE):express is needed for express imports
const express = require('express');

//(NOTE):here we import our express validator for checking incoming information
const { check } = require('express-validator')

//our controller imports
const suggestionsControllers = require('../controllers/suggestions-controllers');
const suggestionFileUpload = require('../middleware/file-upload-suggestion');
const checkAuth = require('../middleware/check-auth');

//custom error message and code import
const HttpError = require('../models/http-error-model')

//(NOTE):the "Router()" is a special object on which we can register our middleware, and then export our configured 
//router and import it at our server and then register it as one singe middle ware in "server.js" 
const router = express.Router();

//here we use this pointers to point to the needed functions
router.use(checkAuth);

//(get all suggestions)
router.get('/', suggestionsControllers.getSuggestions);

//(get all suggestions by common user id)
router.get('/:uid', suggestionsControllers.getSuggestionsByUserId);

//(get suggestion information by its id)
router.get('/EditSuggestion/:sid', suggestionsControllers.getSuggestionById);

//(create a suggestion)
router.post(
    '/',
    suggestionFileUpload.single('suggestionPfp'),
    suggestionsControllers.createSuggestion
);

//(update a tank)
router.patch(
    '/EditSuggestion/:sid',
    suggestionFileUpload.single('suggestionPfp'),
    suggestionsControllers.updateSuggestion
);

router.patch(
    '/UpdateSuggestion/:sid',
    suggestionsControllers.updateSuggestionUser
);

//delete a user
router.delete('/:sid',suggestionsControllers.deleteSuggestion);

module.exports = router;