const uuid = require("../node_modules/uuid/dist/v4");

const fs = require("fs");

const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error-model");

const User = require("../models/user.model");

const getUsers = (req, res, next) => {
  res.json({ users: Users_DB });
};

//(this function is used for signup and registration and it creates a new user in the process)
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorMessage = new HttpError(
      "Invalid Input Detected, Check Your Input Data!",
      422
    );
    return next(errorMessage);
  }
  const { username, email, password, firstName, lastName, country, age } =
    req.body;

  let existingUser;
  try {
    //checks if given email is unique
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const errorMessage = new HttpError(
      "Signing Up Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  if (existingUser) {
    const errorMessage = new HttpError(
      "User Exists Already, Please Login Instead",
      422
    );
    return next(errorMessage);
  }

  const createdUser = new User({
    isAdmin: false,
    imagePfp:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    username,
    email,
    password,
    firstName,
    lastName,
    country,
    age,
    favTanksList: [],
    submittedSuggestions: [],
    creationDate: new Date(),
  });

  try {
    await createdUser.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Signing Up Failed, Please Try Again Later.",
      500
    );
    return next(errorMessage);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

//(this function is used for logging in)
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    //checks if given email is unique
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const errorMessage = new HttpError(
      "Logging In Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  if (!existingUser || existingUser.password !== password) {
    const errorMessage = new HttpError(
      "Invalid User Login Details, Could Not Log In!",
      401
    );
    return next(errorMessage);
  }

  res.json({
    message: "Logged In!",
    user: existingUser.toObject({ getters: true }),
  });
};

const updateUserProfilePic = async (req, res, next) => {
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
  const userToUpdateId = req.params.uid;

  console.log("Given User PFP = " + req.file.path);

  let user;
  try {
    user = await User.findById(userToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching User, Could Not Update User!",
      500
    );
    return next(errorMessage);
  }

  const prevImage = user.imagePfp;
  //here we update our user\admin details
  user.imagePfp = req.file.path;
  user.lastAccountChanges = new Date();

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  if (
    prevImage !=="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" ||
    prevImage !== undefined
  ) {
    fs.unlink(prevImage, (errorMessage) => {
      console.log("Image Delete Result : " + errorMessage);
    });
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateUserDetails = async (req, res, next) => {
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
  const { firstName, lastName, country, age } = req.body;
  const userToUpdateId = req.params.uid;

  let user;
  try {
    user = await User.findById(userToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching User, Could Not Update User!",
      500
    );
    return next(errorMessage);
  }

  //here we update our user\admin details
  user.firstName = firstName;
  user.lastName = lastName;
  user.country = country;
  user.age = age;
  user.lastAccountChanges = new Date();

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateUserOptionalDetails = async (req, res, next) => {
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
  const { company, publisher, association, socialType, socialName, favNation } =
    req.body;

  const userToUpdateId = req.params.uid;

  // const updatedUser = { ...Users_DB.find((u) => u.id === userToUpdateId) };
  let user;
  try {
    user = await User.findById(userToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching User, Could Not Update User!",
      500
    );
    return next(errorMessage);
  }

  //here we update our user\admin details
  user.company = company;
  user.publisher = publisher;
  user.association = association;
  user.socialGroup = { socialType, socialName };
  user.favNation = favNation;
  user.lastAccountChanges = new Date();

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

//!need to handle the email and password update functions later!
const updateUserEmail = async (req, res, next) => {
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
  const { isAdmin, adminKey, email, password, rePassword } = req.body;

  const userToUpdateId = req.params.uid;

  // const updatedUser = { ...Users_DB.find((u) => u.id === userToUpdateId) };
  let user;
  try {
    user = await User.findById(userToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching User, Could Not Update User!",
      500
    );
    return next(errorMessage);
  }

  //here we update our user\admin details
  user.company = company;
  user.publisher = publisher;
  user.association = association;
  user.socialGroup = { socialType, socialName };
  user.favNation = favNation;
  user.lastAccountChanges = new Date();

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
};
//!need to handle the email and password update functions later!
const updateUserPassword = async (req, res, next) => {};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUserProfilePic = updateUserProfilePic;
exports.updateUserDetails = updateUserDetails;
exports.updateUserOptionalDetails = updateUserOptionalDetails;
