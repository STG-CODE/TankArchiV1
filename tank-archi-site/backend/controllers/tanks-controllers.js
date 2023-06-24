// This controller is focused on middle ware functions
//that happen at the related route file and also contain the logic.

const fs = require("fs");

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
      "Fetching Tanks Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ tanks: tanks.map((tank) => tank.toObject({ getters: true })) });
};

//(get names)
const getUniqueNames = async (req, res, next) => {
  let names;
  try {
    names = await Tank.distinct("tankName");
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Nations Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ names: names });
}

//(get nations)
const getUniqueNations = async (req, res, next) => {
  let nations;
  try {
    nations = await Tank.distinct("nation");
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Nations Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ nations: nations });
}

//(get all unique nations)
const getAllUniqueUserNations = async (req, res, next) => {
  let allNations;
  let tempArray = [];
  try {
    let userNations = await Tank.distinct("userNations");
    let count = 0;
    while(userNations.length !== count) {
      tempArray.push(...userNations[count].split(","));
      count = count + 1;
    }
    allNations = [...new Set(tempArray)];
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Nations Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ allNations: allNations });
}

//(get combat role)
const getUniqueCombatRoles = async (req, res, next) => {
  let combatRoles;
  try {
    combatRoles = await Tank.distinct("combatRole");
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Nations Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ combatRoles: combatRoles });
}

//(get eras)
const getUniqueEras = async (req, res, next) => {
  let eras;
  try {
    eras = await Tank.distinct("era");
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Nations Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ eras: eras });
}

//(get service states)
const getUniqueServiceStates = async (req, res, next) => {
  let allServiceStates;
  let tempArray = [];
  try {
    let serviceStates = await Tank.distinct("serviceStates");
    let count = 0;
    while(serviceStates.length !== count) {
      tempArray.push(...serviceStates[count].split(","));
      count = count + 1;
    }
    allServiceStates = [...new Set(tempArray)];
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Service State Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ allServiceStates: allServiceStates });
}

//(get generations)
const getUniqueGenerations = async (req, res, next) => {
  let generations;
  try {
    generations = await Tank.distinct("generation");
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tank's Nations Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ generations: generations });
}

//(get tanks sorted by their average user rating)
const getTanksByRankings = async (req, res, next) => {
  let tanks;
  try {
    tanks = await Tank.find({}).sort({avgRating: -1});
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tanks Failed, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }

  res.json({ tanks: tanks.map((tank) => tank.toObject({ getters: true })) });
};

//(gets tanks by pages for search page at the site)
const getTanksSearchByPages = async (req, res, next) => {
  const { page } = req.query;

  let tanks;
  let total;
  const PAGE_LIMIT = 9;
  try {
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;//used to get the starting index of each page
    total = await Tank.countDocuments({});
    tanks = await Tank.find().sort({tankName: -1}).limit(PAGE_LIMIT).skip(startIndex);
  } catch (err) {
    const errorMessage = new HttpError(
      "Fetching Tanks Failed, Please Try Again Later!",
      500
    );
    console.log(err);
    return next(errorMessage);
  }

  res.json({
     tanks: tanks.map((tank) => tank.toObject({ getters: true })), 
     currentPage: Number(page), 
     numberOfPages: Math.ceil(total / PAGE_LIMIT)
  });
};

//JSON.parse(searchQuery).tankNameJSON.stringify()
const getTanksBySearch = async (req, res, next) => {
  const {
    searchQuery,
    searchNation,
    searchUserNations,
    searchCombatRole,
    searchEra,
    searchAge,
    searchServiceState,
    searchGeneration
  } = req.query;
  let tanks;
  try {
    const tankName = new RegExp(searchQuery,'i');
    const nationName = new RegExp(searchNation,'i');
    const userNationsName = new RegExp(searchUserNations,'i');
    const combatRoleName = new RegExp(searchCombatRole,'i');
    const eraName = new RegExp(searchEra,'i');
    const arrayOfAges = searchAge !== undefined ? searchAge.split(',') : [null,null];
    const searchAgeFrom = parseInt(arrayOfAges[0]);
    const searchAgeTo = parseInt(arrayOfAges[1]);
    const serviceStateNames = new RegExp(searchServiceState);
    const generationName = new RegExp(searchGeneration);
    console.log(
      `Searching : Name = ${tankName} | Nation = ${nationName} | User Nation = ${userNationsName} | Combat Role = ${combatRoleName} | Era = ${eraName} | Search Age ${searchAgeFrom}-${searchAgeTo} | Service State = ${serviceStateNames} | Gen = ${generationName}`
      );
    tanks = await Tank.find( { $or: [ 
      { tankName: tankName},
      { nation: nationName},
      { userNations: userNationsName},
      { combatRole: combatRoleName},
      { era: eraName},
      { age: {$gt: searchAgeFrom || null,$lt: searchAgeTo || null} },
      { serviceStates: serviceStateNames},
      { generation: generationName},
    ] } );
  } catch (err) {
    const errorMessage = new HttpError(
      "Searching For Tanks Failed, Please Try Again Later!",
      500
    );
    console.log(err);
    return next(errorMessage);
  }

  res.json({ tanks: tanks.map((tank) => tank.toObject({ getters: true })) });
};

//!consider changing to one function instead of two separate ones
//(this function three random tanks from the database)
const getThreeRandomTanks = async (req, res, next) => {
  const tankId = req.params.tid;
  let tanks = [];
  try {
    const currentTank = await Tank.aggregate([{ $sample: { size: 4 } }]);
    let i = 0;
    while(tanks.length !== 3){
      if(currentTank[i]._id.toString() !== tankId){
        tanks.push(currentTank[i]);
      }
      i++
    }
  } catch (err) {
    if(tanks.length === 0) {
      console.log("- - - Failed To Fetch Three Random Tanks Due To Current Database Condition! - - -");
      console.log(err);
    } else {
      const errorMessage = new HttpError(
        "Fetching Tanks Failed, Please Try Again Later!",
        500
      );
      console.log(err)
      return next(errorMessage); 
    }
    
  }
  res.json({ tanks: tanks });
};

//
const getNineRandomTanks = async (req, res, next) => {
  let tanks = [];
  try {
    const currentTank = await Tank.aggregate([{ $sample: { size: 9 } }]);
    let i = 0;
    while(i !== currentTank.length  ){
        tanks.push(currentTank[i]);
      i++
    }
  } catch (err) {
    if(tanks.length === 0) {
      console.log("- - - Failed To Fetch Three Random Tanks Due To Current Database Condition! - - -");
      console.log(err);
    } else {
      const errorMessage = new HttpError(
        "Fetching Tanks Failed, Please Try Again Later!",
        500
      );
      console.log(err)
      return next(errorMessage);
    }
    
  }
  res.json({ tanks: tanks });
}

//(this function gets us the specific tank by the given ID)
const getTankById = async (req, res, next) => {
  const tankId = req.params.tid; // -> contains the id of the user

  let tank;
  try {
    tank = await Tank.findById(tankId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong! Could Not Find The Given Tank By Id!",
      500
    );
    return next(errorMessage);
  }

  if (!tank) {
    const errorMessage = new HttpError("Could Not Find Tank!", 404);
    return next(errorMessage);
  } //in case no tank is found

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
      "Something Went Wrong! Could Not Find The Given Tank By Name!",
      500
    );
    return next(errorMessage);
  }

  if (!tank) {
    const errorMessage = new HttpError("Could Not Find Tank!", 404);
    return next(errorMessage);
  } //in case no tank is found

  return res.json({ tank: tank.toObject({ getters: true }) }); //present the found value
};

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

  if(!req.adminState.isAdmin){
    const errorMessage = new HttpError(
      "You Are Not Qualified For This Operation On The Site's Tanks!",
      401
    );
    return next(errorMessage);
  }

  //the expected data
  const {
    tankName,
    nation,
    userNations,
    combatRole,
    era,
    serviceStates,
    generation,
    age,
    startDate,
    endDate,
    tankHistory,
    tankServiceHistory,
    tankServiceStatesInfo,
    tankProductionHistory,
    tankArmamentAndArmour,
  } = req.body;

  const createdTank = new Tank({
    tankName,
    nation,
    userNations: userNations,
    combatRole,
    era,
    serviceStates,
    generation,
    age,
    servicePeriod: { startDate, endDate },
    tankHistory,
    tankServiceHistory,
    tankServiceStatesInfo,
    tankProductionHistory,
    tankArmamentAndArmour,
    uploadDate: new Date(), //?make sure that this gets us the current time and date
    lastUpdated: new Date(),
    tankImagePfp: req.file.path || "uploads/stockImages/tankStockIcon.jpg",
    photoCollection: [],
    overallRatingSum: 0,
    avgRating: 0,
    ratingVoteCount: 0,
    likeVoteCount: 0,
  });

  try {
    await createdTank.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Tank Creation Failed, Please Try Again.",
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

  if(!req.adminState.isAdmin){
    const errorMessage = new HttpError(
      "You Are Not Qualified For This Operation On The Site's Tanks!",
      401
    );
    return next(errorMessage);
  }

  //the expected data
  const {
    tankName,
    nation,
    userNations,
    combatRole,
    era,
    serviceStates,
    generation,
    age,
    startDate,
    endDate,
    tankHistory,
    tankServiceHistory,
    tankServiceStatesInfo,
    tankProductionHistory,
    tankArmamentAndArmour,
  } = req.body;

  const tankToUpdateId = req.params.tid;

  let tank;
  try {
    tank = await Tank.findById(tankToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
  //here we update our tank details
  const prevTankPfp = tank.tankImagePfp || null;

  tank.tankName = tankName;
  tank.nation = nation;
  tank.userNations = userNations; 
  tank.combatRole = combatRole;
  tank.era = era;
  tank.serviceStates = serviceStates;
  tank.generation = generation;
  tank.age = age;
  tank.servicePeriod = { startDate, endDate }; //!find out about objects
  tank.tankHistory = tankHistory;
  tank.tankServiceHistory = tankServiceHistory;
  tank.tankServiceStatesInfo = tankServiceStatesInfo;
  tank.tankProductionHistory = tankProductionHistory;
  tank.tankArmamentAndArmour = tankArmamentAndArmour;
  tank.tankServiceHistory = tankServiceHistory;
  tank.lastUpdated = new Date(); //?make sure that this gets us the current time and date
  try {
    tank.tankImagePfp = req.file.path;
    console.log("Prev = " + prevTankPfp);
    if (prevTankPfp !== null) {
      if (prevTankPfp !== "uploads/stockImages/tankStockIcon.jpg") {
        console.log("- - - Deleting Prev Image - - -");
        fs.unlink(prevTankPfp, (errorMessage) => {
          console.log("Image Delete Result : " + errorMessage);
        });
      }
    }
  } catch (err) {
    console.log("No New Image Submitted!");
    tank.tankImagePfp = prevTankPfp;
  }
  try {
    await tank.save();
  } catch (err) {
    console.log(err);
    const errorMessage = new HttpError(
      "Something Went Wrong While Saving Tank, Could Not Update Tank!",
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

  if(!req.adminState.isAdmin){
    const errorMessage = new HttpError(
      "You Are Not Qualified For This Operation On The Site's Tanks!",
      401
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
      "Something Went Wrong While Fetching Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }

  //here we update our tank details
  try {
    const tankPhotos = req.files;
    tankPhotos.forEach((photo) => {
      if (photo !== null) {
        tank.photoCollection.push(photo.path);
      }
    });
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Implementing Submitted Photos, Please Try Again Later",
      500
    );
  }

  console.log(
    "Current Photo Collection After Update = " + tank.photoCollection
  );
  tank.lastUpdated = new Date(); //?make sure that this gets us the current time and date

  try {
    await tank.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Saving Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }

  res.status(200).json({ tank: tank.toObject({ getter: true }) });
};

const updateTankProfilePhoto = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const errorMessage = new HttpError(
      "Invalid Input Detected, Check Your Input Data!",
      422
    );
    return next(errorMessage);
  }

  if(!req.adminState.isAdmin){
    const errorMessage = new HttpError(
      "You Are Not Qualified For This Operation On The Site's Tanks!",
      401
    );
    return next(errorMessage);
  }

  //the expected data
  const tankToUpdateId = req.params.tid;

  console.log("Given Tank PFP = " + req.file.path);

  let tank;
  try {
    tank = await Tank.findById(tankToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }

  const prevImage = tank.tankImagePfp;
  //here we update our user\admin details
  tank.tankImagePfp = req.file.path;
  tank.lastUpdated = new Date();

  try {
    await tank.save();
  } catch (err) {
    const errorMessage = new HttpError(
      "Could Not Update And Save The Given Changes, Please Try Again Later!",
      500
    );
    return next(errorMessage);
  }
  console.log("Prev Tank Image = " + prevImage);

  if (prevImage !== "uploads/stockImages/tankStockIcon.jpg") {
    console.log("- - - Deleting Prev Image - - -");
    fs.unlink(prevImage, (errorMessage) => {
      console.log("Image Delete Result : " + errorMessage);
    });
  }

  //we convert our mongoose object to a regular js object and get reed of our '__id'
  res.status(200).json({ tank: tank.toObject({ getters: true }) });
};

const updateTankRating = async (req, res, next) => {
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
    rating
  } = req.body;

  const tankToUpdateId = req.params.tid;

  let tank;
  try {
    tank = await Tank.findById(tankToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
  //here we update our tank details

  tank.ratingVoteCount += 1;
  tank.overallRatingSum += rating;
  tank.avgRating = tank.overallRatingSum / tank.ratingVoteCount;

  try {
    await tank.save();
  } catch (err) {
    console.log(err);
    const errorMessage = new HttpError(
      "Something Went Wrong While Saving Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
};

const addTankLike = async (req, res ,next) => {
  console.log("addTankLike Activated")
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
  console.log("Tank Id To Add Like To = " + tankToUpdateId);
  let tank;
  try {
    tank = await Tank.findById(tankToUpdateId);
  } catch (err) {
    const errorMessage = new HttpError(
      "Something Went Wrong While Fetching Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
  //here we update our tank details

  tank.likeVoteCount = tank.likeVoteCount + 1;
 
  try {
    await tank.save();
  } catch (err) {
    console.log(err);
    const errorMessage = new HttpError(
      "Something Went Wrong While Saving Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
};

const removeTankLike = async (req, res ,next) => {
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
      "Something Went Wrong While Fetching Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
  //here we update our tank details

  tank.likeVoteCount -= 1;
 
  try {
    await tank.save();
  } catch (err) {
    console.log(err);
    const errorMessage = new HttpError(
      "Something Went Wrong While Saving Tank, Could Not Update Tank!",
      500
    );
    return next(errorMessage);
  }
};
//(this function is used to delete the chosen tank)
const deleteTank = async (req, res, next) => {
  const tankId = req.params.tid;

  if(!req.adminState.isAdmin){
    const errorMessage = new HttpError(
      "You Are Not Qualified For This Operation On The Site's Tanks!",
      401
    );
    return next(errorMessage);
  }

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

  const prevTankImage = tank.tankImagePfp;

  try {
    await tank.remove();
    if (prevTankImage !== null) {
      if (prevTankImage !== "uploads/stockImages/tankStockIcon.jpg") {
        console.log("- - - Deleting Prev Image - - -");
        fs.unlink(prevTankImage, (errorMessage) => {
          console.log("Image Delete Result : " + errorMessage);
        });
      }
    }
  } catch (err) {
    const errorMassage = new HttpError(
      "Something Went Wrong While Deleting User, Please Try Again Later!",
      500
    );
    return next(errorMassage);
  }

  res.status(200).json({ message: "Tank Was Deleted" });
};

//(our exported functions for using outside)
//do same for other functions
exports.getTanks = getTanks;
exports.getUniqueNames = getUniqueNames;
exports.getUniqueNations = getUniqueNations;
exports.getAllUniqueUserNations = getAllUniqueUserNations;
exports.getUniqueCombatRoles = getUniqueCombatRoles;
exports.getUniqueEras = getUniqueEras;
exports.getUniqueServiceStates = getUniqueServiceStates;
exports.getUniqueGenerations = getUniqueGenerations;
exports.getTanksByRankings = getTanksByRankings;
exports.getTanksSearchByPages = getTanksSearchByPages;
exports.getTanksBySearch = getTanksBySearch;
exports.getThreeRandomTanks = getThreeRandomTanks;
exports.getNineRandomTanks = getNineRandomTanks;
exports.getTankById = getTankById;
exports.getTankByName = getTankByName;
exports.createTank = createTank;
exports.updateTank = updateTank;
exports.updateTankProfilePhoto = updateTankProfilePhoto;
exports.updateTankPhotos = updateTankPhotos;
exports.updateTankRating = updateTankRating;
exports.addTankLike = addTankLike;
exports.removeTankLike = removeTankLike;
exports.deleteTank = deleteTank;
