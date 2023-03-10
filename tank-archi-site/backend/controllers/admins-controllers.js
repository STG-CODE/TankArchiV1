// This controller is focused on middle ware functions
//that happen at the related route file and also contain the logic.
const uuid = require("../node_modules/uuid/dist/v4");
//we then place uuid as a function where ever we want a random id ( "uuid" )

const fs = require("fs");

//we add this function so that when we call it we can use it to check if there were any validation errors
const { validationResult } = require("express-validator");
//
const HttpError = require("../models/http-error-model");
//
const User = require("../models/user.model");


//(this function gets us all the users)
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const errorMessage = new HttpError(
      'Fetching Users Failed, Please Try Again Later!',
      500
    );
    return next(errorMessage);
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

//we get a user by a given ID
//(this function gets us a user by a given ID)
const getUserById = async (req, res, next) => {
  const userId = req.params.uid; // -> contains the id of the user

  let user;
  try{
    user = await User.findById(userId);
  } catch (err){
    const errorMessage = new HttpError(
      'Something Went Wrong! Could Not Find The Given User By Id!',
      500
    );
    return next(errorMessage);
  }
  

  if (!user) {
    const errorMessage = new HttpError(
      'Could not find user!',
      404
    );
    return next(errorMessage);
  } //in case no user is found

  return res.json({ user: user.toObject({ getters: true }) }); //present the found value
};

//!consider creating an expanded version of this function for creating users with all the information pre determined.
//here we are extracting data from incoming request to create a new user
//TODO : need to implement expected information the in const fields
//(this function creates a new user)
const createUser = async (req, res, next) => {

  //checks and returns errors depending on the predefined checking at
  // the call of this function at the related route file.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid Input Detected, Check Your Input Data!", 422);
  }

  //the expected data
  const { 
    username,
    email,
    password,
    firstName,
    lastName,
    country,
    age } = req.body;

  const createdUser = new User({
    isAdmin: false,
    adminKey: null,
    imagePfp:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    username,
    email,
    password,
    firstName,
    lastName,
    country,
    age,
    favTanksList: [],
    submittedSuggestions: [],
    creationDate: new Date()//?make sure that this gets us the current time and date
  });

  try {
    await createdUser.save();
  } catch (err) {
    const errorMessage = new HttpError(
        'Saving Created User Failed, Please Try Again.',500
    );
    return next(errorMessage);
  }
  

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

//(this function is used for updating the user's information)
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorMessage = new HttpError(
      "Invalid Input Detected, Check Your Input Data!",
      422
    );
    return next(errorMessage);
  }

  //the expected data
  //!(Note that you can remove other data that is expected in case you dont wish to change it)
  const { 
    username,
    firstName,
    lastName,
    country,
    age,
    company,
    publisher,
    association,
    socialType,
    socialName,
    } = req.body;

  const userToUpdateId = req.params.uid;
  
  // //!(Note that we add "..." before the statement so that we copy our user and replace the original with the updated version)
  // const updatedUser = { ...Users_DB.find((u) => u.id === userToUpdateId) };

  let user;
  try {
    user = await User.findById(userToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Fetching User, Could Not Update User!',
      500
    );
    return next(errorMessage);
  }
  
  //here we update our user\admin details
  user.username = username;
  user.firstName = firstName;
  user.lastName = lastName;
  user.country = country;
  user.age = age;
  user.lastAccountChanges = new Date;
  user.company = company;
  user.publisher = publisher;
  user.association = association;
  user.socialGroup = {socialType,socialName};

  try {
    await user.save();
  } catch (err){
    const errorMessage = new HttpError(
      'Could Not Update And Save The Given Changes, Please Try Again Later!',
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({user: user.toObject({ getters: true }) });
};

//(this function deletes the user from the database)
const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  
  let imagePath;
  let user;
  try {
    user = await User.findById(userId);
    imagePath = user.imagePfp;
  } catch (err){
    const errorMessage = new HttpError(
      'Something Went Wrong While Fetching The User, Could Not Delete User!',
      500
    );
    return next(errorMessage)
  }

  try{
    await user.remove();
  } catch(err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Deleting User, Please Try Again Later!',
      500
    );
    return next(errorMessage)
  }
  
  fs.unlink(imagePath, errorMessage => {
    console.log("Image Delete Result : " + errorMessage
    );
  })

  res.status(200).json({ message: "User Was Deleted" });
};

//do same for other functions
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
