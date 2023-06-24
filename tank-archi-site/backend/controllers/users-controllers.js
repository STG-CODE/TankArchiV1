const uuid = require("../node_modules/uuid/dist/v4");

const fs = require("fs");

const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error-model");

const User = require("../models/user.model");

const getUsers = (req, res, next) => {
  res.json({ users: Users_DB });
};

//!need to add the "re enter password verification" part
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
  const { username, email , password, firstName, lastName, country, age } =
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password , 12);
  } catch (err) {
    const errorMessage = new HttpError(
      'Could Not Create User!',
      500
    );
    return next(errorMessage);
  }
  

  const createdUser = new User({
    isAdmin: false,
    adminKey: null,
    adminRole: null,
    imagePfp: req.file.path || "uploads/stockImages/stockPfpPicture.jpg",
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    country,
    age,
    socialGroup:{
      socialType:null,
      socialName:null
    },
    submittedSuggestions: [],
    favTanksList: [],
    likedTanksList: [],
    ratedTanksList: [{
        tankObject:[],
        rating:0
    }],
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

  let token;
  try {
    token = jwt.sign(
      {isAdmin: false ,userId: createdUser.id, email: createdUser.email},
      'cultured_tanker_token',
      {expiresIn:'1h'}
    );
  } catch (err) {
    const errorMessage = new HttpError(
      "Signing Up Failed, Please Try Again Later.",
      500
    );
    return next(errorMessage);
  }
  

  res.status(201).json({ user: createdUser.toObject({ getters: true }), token: token });
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
      "Logging In Failed, Failed To Find Email!",
      500
    );
    return next(errorMessage);
  }

  if (!existingUser) {
    const errorMessage = new HttpError(
      "Invalid User Login Details, Could Not Log In!",
      401
    );
    return next(errorMessage);
  }

  console.log("User Password = " + existingUser.password)
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Log You In, Please Check Your Password!",
      500
   );
   return next(errorMessage);
  }
  
  if(!isValidPassword) {
    const errorMessage = new HttpError(
      "Invalid Credentials, Cold Not Log You In!",
      401
    );
    return next(errorMessage);
  }

  let token;
  try {
    token = jwt.sign(
      {isAdmin: existingUser.isAdmin ,userId: existingUser.id, email: existingUser.email},
      'cultured_tanker_token',
      {expiresIn:'1h'}
    );
  } catch (err) {
    const errorMessage = new HttpError(
      "Logging In Failed, Please Try Again Later.",
      500
    );
    return next(errorMessage);
  }

  console.log("User Token = " + token);
  res.json({
    message: "Logged In!",
    user: existingUser.toObject({ getters: true }),
    token: token
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
  console.log("Prev User Image = " + prevImage);
  
  if (prevImage !=="uploads/stockImages/stockPfpPicture.jpg") {
    console.log("- - - Deleting Prev Image - - -")
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
  const { company, publisher, association, socialType, socialName, favNation } = req.body;

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

//TODO: implement proper
const updateLastLogin = async (req, res, next) => {
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

  let user;
  try {
    user = await User.findById(userToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching User,Could Not Update Last Login Date!",
      500
    );
    return next(errorMessage);
  }

  //here we update our user\admin details
  user.lastLoginDate = new Date();

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update Last Login And Save, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
}

//add tank to fav list
const addTankToFavList = async (req, res, next) => {
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
  const { tankId } = req.body;

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
  user.favTanksList.push(tankId);

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
}

//remove tank from fav list
const removeTankFromFavList = async (req, res, next) => {
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
  const { tankId } = req.body;

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
  user.favTanksList.remove(tankId);

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
}

//add liked tank to list
const addLikedTank = async (req,res,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorMessage = new HttpError(
      "Invalid Input Detected, Check Your Input Data!",
      422
    );
    return next(errorMessage);
  }
  console.log("added a like");
  //the expected data
  const { tankId } = req.body;
  console.log("Tank ID = " + tankId);
  const userToUpdateId = req.params.uid;
  console.log("User ID = " + userToUpdateId);
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
  user.likedTanksList.push(tankId);

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
}

//remove liked tank from list
const removeLikedTank = async (req,res,next) =>{
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
  const { tankId } = req.body;

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
  user.likedTanksList.remove(tankId);

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
}

//add rated tank to list
const addRatedTank = async (req, res, next) => {
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
  const { tankId,rating } = req.body;

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
  user.ratedTanksList.push({
    tankId,
    rating
  });

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
}

//remove rated tank from list
const removeRatedTank = async (req,res,next) => {
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
  const { tankId,rating } = req.body;

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
  user.ratedTanksList.remove({
    tankId,
    rating
  });

  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
}

const changeUserEmail = async (req, res, next) => {
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
  const {email, password} = req.body;
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

  if(email === user.email && password === user.password){
    try { 
      user.email = email;
      user.lastAccountChanges = new Date();
    } catch (err) {}
  } else {
    throw new HttpError(
      "Password Or Email Was Not Entered Correctly And Email Was Not Changed!",
      422
    )
  }
  
  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Email Change, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const changeUserPassword = async (req, res, next) => {
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
  const {email, password} = req.body;
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

  if(email === user.email && password === user.password){
    try { 
      user.password = password;
      user.lastAccountChanges = new Date();
    } catch (err) {}
  } else {
    throw new HttpError(
      "Password Or Email Was Not Entered Correctly And Password Was Not Changed!",
      422
    )
  }
  
  try {
    await user.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Password Change, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateUserProfilePic = updateUserProfilePic;
exports.updateUserDetails = updateUserDetails;
exports.updateUserOptionalDetails = updateUserOptionalDetails;
exports.updateLastLogin = updateLastLogin;
exports.addTankToFavList = addTankToFavList;
exports.removeTankFromFavList = removeTankFromFavList;
exports.addLikedTank = addLikedTank;
exports.removeLikedTank = removeLikedTank;
exports.addRatedTank = addRatedTank;
exports.removeRatedTank = removeRatedTank;
exports.changeUserEmail = changeUserEmail;
exports.changeUserPassword = changeUserPassword;
