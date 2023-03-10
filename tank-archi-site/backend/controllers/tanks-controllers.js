// This controller is focused on middle ware functions
//that happen at the related route file and also contain the logic.

//we add this function so that when we call it we can use it to check if there were any validation errors
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error-model");
const Tank = require("../models/tank.model");

//(this function gets us all the tanks at the Database)
const getTanks = async (req, res, next) => {
  let tanks;
  try {
    tanks = await Tank.find({});
  } catch (err) {
    const errorMessage = new HttpError(
      'Fetching Tanks Failed, Please Try Again Later!',
      500
    );
    return next(errorMessage);
  }

  res.json({ tanks: tanks.map(tank => tank.toObject({ getters: true})) });
};

//(this function gets us the specific tank by the given ID)
const getTankById = async (req, res, next) => {
  const tankId = req.params.tid; // -> contains the id of the user

  let tank;
  try {
    tank = await Tank.findById(tankId);
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong! Could Not Find The Given Tank By Id!',
      500
    );
    return next(errorMessage);
  }

  if(!tank){
    const errorMessage = new HttpError(
      'Could Not Find Tank!',
      404
    );
    return next(errorMessage);
  }//in case no tank is found

  return res.json({ tank: tank.toObject({ getters: true }) }); //present the found value
};

//(this function gets us the specific tank by the given tank name)
const getTankByName = async (req, res, next) => {
  const tankName = req.params.tankName; // -> contains the id of the user

  let tank;
  try {
    tank = await Tank.findOne(tankName);
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong! Could Not Find The Given Tank By Name!',
      500
    );
    return next(errorMessage);
  }

  if(!tank){
    const errorMessage = new HttpError(
      'Could Not Find Tank!',
      404
    );
    return next(errorMessage);
  }//in case no tank is found

  return res.json({ tank: tank.toObject({ getters: true }) }); //present the found value
}

//(this function is used for creating the tank)
//here we are extracting data from incoming request
const createTank = async (req, res, next) => {
  
  //checks and returns errors depending on the predefined checking at
  // the call of this function at the related route file.
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
    tankArmamentAndArmour,
    } = req.body;

  const createdTank = new Tank({
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
    avgRating: 0,
    uploadDate: new Date,//?make sure that this gets us the current time and date
    lastUpdated: new Date,
    tankImagePfp:'https://img.freepik.com/premium-vector/military-tank-icon-logo-element-illustration-military-tank-symbol-design-from-2-colored-collection-simple-military-tank-concept-can-be-used-web-mobile_159242-4994.jpg?w=996',
    photoCollection: [],
    voteCount: 0,
    avgRating: 0,
    overallRatingSum: 0,
  });

  try {
    await createdTank.save();
  } catch (err) {
    const errorMessage = new HttpError(
        'Creating Tank Failed, Please Try Again.',
        500
    );
    return next(errorMessage);
  }
  
  res.status(201).json({ tank: createdTank });
};

//(this function is used to update our tank's details)
const updateTank = async (req, res, next) => {
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

  const tankToUpdateId = req.params.tid;
  
  let tank;
  try {
    tank = await Tank.findById(tankToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Fetching Tank, Could Not Update Tank!',
      500
    );
    return next(errorMessage);
  }
  //here we update our tank details
  tank.tankName = tankName;
  tank.nation = nation;
  tank.combatRole = combatRole;
  tank.era = era;
  tank.age = age;
  tank.servicePeriod = {startDate,endDate};//!find out about objects
  tank.tankHistory = tankHistory;
  tank.tankServiceHistory = tankServiceHistory;
  tank.tankProductionHistory = tankProductionHistory;
  tank.tankArmamentAndArmour = tankArmamentAndArmour;
  tank.tankServiceHistory = tankServiceHistory;
  tank.lastUpdated = new Date;//?make sure that this gets us the current time and date

  try {
    await tank.save();
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Saving Tank, Could Not Update Tank!',
      500
    );
    return next(errorMessage);
  }

  res.status(200).json({ tank: tank.toObject({ getter: true }) });
};

const updateTankPhotos = async (req, res, next) => {
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

  const tankToUpdateId = req.params.tid;
  
  let tank;
  try {
    tank = await Tank.findById(tankToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Fetching Tank, Could Not Update Tank!',
      500
    );
    return next(errorMessage);
  }

  //here we update our tank details
  try {
    const tankPhotos = req.files;
    tankPhotos.forEach(photo => {
      if(photo !== null) {
        tank.photoCollection.push(photo.path);
      }
    });
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Implementing Submitted Photos, Please Try Again Later',
      500
    );
  }
  
  
  console.log("Current Photo Collection After Update = " + tank.photoCollection)
  tank.lastUpdated = new Date;//?make sure that this gets us the current time and date

  try {
    await tank.save();
  } catch (err) {
    const errorMessage = new HttpError(
      'Something Went Wrong While Saving Tank, Could Not Update Tank!',
      500
    );
    return next(errorMessage);
  }

  res.status(200).json({ tank: tank.toObject({ getter: true }) });
}

//(this function is used to delete the chosen tank)
const deleteTank = async (req, res, next) => {
  const tankId = req.params.tid;

  let tank;
  try {
    tank = await Tank.findById(tankId);
  } catch (err) {
      const errorMassage = new HttpError(
      "Could not find the tank with that given id!", 
      500
    );
    return next(errorMassage);
  }

  try {
    await tank.remove();
  } catch (err) {
    const errorMassage = new HttpError(
      'Something Went Wrong While Deleting User, Please Try Again Later!', 
      500
    );
    return next(errorMassage);
  }

  res.status(200).json({ message: "Tank Was Deleted" });
};

//(our exported functions for using outside)
//do same for other functions
exports.getTanks = getTanks;
exports.getTankById = getTankById;
exports.getTankByName = getTankByName;
exports.createTank = createTank;
exports.updateTank = updateTank;
exports.updateTankPhotos = updateTankPhotos;
exports.deleteTank = deleteTank;