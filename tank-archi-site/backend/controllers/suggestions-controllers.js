// This controller is focused on middle ware functions
//that happen at the related route file and also contain the logic.

//we add this function so that when we call it we can use it to check if there were any validation errors
const { validationResult } = require("express-validator");
//
const mongoose = require("mongoose");
//
const HttpError = require("../models/http-error-model");
//
const Suggestion = require("../models/suggestion.model");
//
const User = require("../models/user.model");

//(get all suggestions from DB)
const getSuggestions = async (req, res, next) => {
  let suggestions;
  try {
    suggestions = await Suggestion.find({});
  } catch (err) {
    const errorMessage = new HttpError(
      'Fetching Suggestions Failed, Please Try Again Later!',
      500
    );
    return next(errorMessage);
  }

  res.json({ suggestions: suggestions.map(suggestion => suggestion.toObject({ getters: true })) });
};

//(get suggestion by suggestion id)
const getSuggestionById = async (req, res, next) => {
  const suggestionId = req.params.sid; // -> contains the id of the suggestion

  let suggestion;
  try{
    suggestion = await Suggestion.findById(suggestionId);
  } catch(err){
    const errorMessage = new HttpError(
      'Something Went Wrong While Fetching Suggestion!',
      500
      );
      return next(errorMessage);
  }

  if (!suggestion) {
    const errorMessage = new HttpError(
      "Could not find suggestion!",
      404
    );
    return next(errorMessage);
  } //in case no user is found

  return res.json({ suggestion: suggestion.toObject({ getters: true }) }); //present the found value
};

//!test and adjust for final form!
//(get suggestions using a given user's id to find suggestion with same user id)
const getSuggestionsByUserId = async (req, res, next) => {
  const creatorId = req.params.uid;
  console.log("Creator ID = " + creatorId);
  let userWithSuggestions
  try{
    userWithSuggestions = await User.findById(creatorId).populate('submittedSuggestions');
  } catch(err){
    const errorMessage = new HttpError(
      'Fetching Suggestions Failed, Please Try Again Later.',
      500
    );
    return next(errorMessage);
  }
//!CHANGE TO SOMETHING ELSE THAT WONT PROMPT A WINDOW
  if(!userWithSuggestions || !userWithSuggestions.submittedSuggestions.length === 0){
    return next(
      new HttpError(
        'Could Not Find Suggestions For The Current User.',
        404
      )
    );
  }

  res.json({ suggestions: userWithSuggestions.submittedSuggestions.map(suggestion => suggestion.toObject({ getters: true })) });
}

//here we are extracting data from incoming request
const createSuggestion = async (req, res, next) => {
  
    //checks and returns errors depending on the predefined checking at
  // the call of this function at the related route file.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid Input Detected, Check Your Input Data!", 422);
  }

  //the expected data
  const {
    suggestionTitle,
    tankName,
    nation,
    combatRole,
    era,
    age,
    startDate,
    endDate,
    tankHistory,
    tankServiceHistory,
    tankProductionHistory,
    tankArmamentAndArmour,
    creator,
    creatorPfp,
    creatorName,
    creatorAge,
    creatorEmail,
    userDescription } = req.body;

  const createdSuggestion = new Suggestion({
    suggestionTitle,
    tankName,
    nation,
    combatRole,
    era,
    age,
    servicePeriod: {startDate,endDate},
    tankHistory,
    tankServiceHistory,
    tankProductionHistory,
    tankArmamentAndArmour,
    submissionDate: new Date,//?make sure that this gets us the current time and date
    creator,
    creatorPfp,
    creatorName,
    creatorAge,
    creatorEmail,
    userDescription
  });

  let user;
  try{
    user = await User.findById(creator);
  } catch(err) {
    const errorMessage = new HttpError(
      'Could Not Find User,Please Try Again Later.',
      500
    );
    return next(errorMessage)
  }

  if(!user) {
    const errorMessage = new HttpError(
      'Could Not Find User For Provided ID',
      404
    );
    return next(errorMessage);
  }

  console.log(user);
  console.log('Found User For Assigning The Suggestion To.')
  //here we test both scenarios for if it succeeds in saving suggestion and also if it succeeds in saving the user
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdSuggestion.save({ session: session });
    user.submittedSuggestions.push(createdSuggestion);
    await user.save({ session: session });
    console.log('Successfully Created Suggestion And Indexed It With Its Creator')
    await session.commitTransaction();

  } catch (err) {
    const errorMessage = new HttpError(
        'Saving Created Suggestion Failed, Please Try Again.',500
    );
    return next(errorMessage);
  }
  

  res.status(201).json({ suggestion: createdSuggestion.toObject({ getters: true }) });
};

//
const updateSuggestion = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorMessage = new HttpError(
      "Invalid Input Detected, Check Your Input Data!",
      422
    );
    return next(errorMessage)
  }

  //the expected data
  const { 
    tankName,
    nation,
    combatRole,
    era,
    age,
    startDate,
    endDate,
    tankHistory,
    tankServiceHistory,
    tankProductionHistory,
    tankArmamentAndArmour } = req.body;

  const suggestionToUpdateId = req.params.sid;
  
  let suggestion;
  try{
    suggestion = await Suggestion.findById(suggestionToUpdateId);
  } catch(err){
    const errorMessage = new HttpError(
      'Could Find Suggestion By Id, Please Try Again!',
      500
    );
    return next(errorMessage);
  }
  
  //here we update our suggestion details
  suggestion.tankName = tankName;
  suggestion.nation = nation;
  suggestion.combatRole = combatRole;
  suggestion.era = era;
  suggestion.age = age;
  suggestion.servicePeriod = {startDate,endDate};//!find out about objects
  suggestion.tankHistory = tankHistory;
  suggestion.tankServiceHistory = tankServiceHistory;
  suggestion.tankProductionHistory = tankProductionHistory;
  suggestion.tankArmamentAndArmour = tankArmamentAndArmour;
  suggestion.lastUpdatedDate = new Date;//?make sure that this gets us the current time and date

  try {
    await suggestion.save();
  } catch (err) {
    const errorMessage = new HttpError(
      'Could Not Update And Save The Given Changes, Please Try Again Later!',
      500
    );
    return next(errorMessage);
  }

  res.status(200).json({ suggestion: suggestion.toObject({ getters: true }) });
};

//
const deleteSuggestion = async (req, res, next) => {
  const suggestionId = req.params.sid;

  let suggestion;
  try{
    //we use the populate() function to refer to a doc stored in 
    // another collection and work with data in that other existing doc,
    // relations were defined with the "ref: " in the models.
    suggestion = await Suggestion.findById(suggestionId).populate('creator');
  } catch(err){
    const errorMessage = new HttpError(
      'Could Not Find Suggestion To Delete, Please Try Again Later!',
      500
    );
    return next(errorMessage);
  }

  if(!suggestion){
    const errorMessage = new HttpError(
      'Could Not Find Suggestion For This Id.',
      404
    );
    return next(errorMessage);
  }

  try{
    const session = await mongoose.startSession();
    session.startTransaction();
    await suggestion.remove({session: session});
    suggestion.creator.submittedSuggestions.pull(suggestion);
    await suggestion.creator.save({session: session});
    await session.commitTransaction();
  } catch(err) {
    const errorMessage = new HttpError(
      'Could Not Delete Suggestion, Please Try Again!',
      500
    );
    return next(errorMessage);
  }

  res.status(200).json({ message: "Suggestion Was Deleted" });
};

//do same for other functions
exports.getSuggestions = getSuggestions;
exports.getSuggestionById = getSuggestionById;
exports.getSuggestionsByUserId = getSuggestionsByUserId; ;
exports.createSuggestion = createSuggestion;
exports.updateSuggestion = updateSuggestion;
exports.deleteSuggestion = deleteSuggestion;