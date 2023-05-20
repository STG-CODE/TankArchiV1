const mongoose = require('mongoose');

const Schema = mongoose.Schema;

///// ?NEW: 
/////? userNations - contains the nations that used the tank , 
/////? serviceState - contains the current state of the tank's service ,
/////? generation - contains the generation that the tank relates to
//?Tank crew accounts and stories
const tankSchema = new Schema({
    tankName: { type: String , required: true },
    nation: { type: String , required: true },
    userNations: { type: Array , required: true },
    combatRole: { type: String , required: true },
    serviceStates: { type: Array , required: true },
    generation: { type: String , required: true },
    
    era: { type: String , required: false },
    age: { type: Number , required: false },
    servicePeriod: {
        startDate: { type: String , required: true },
        endDate: { type: String , required: true }
    },

    tankHistory: { type: String , required: true },
    tankServiceHistory: { type: String , required: true },
    tankServiceStatesInfo: { type: String , required: true },
    tankProductionHistory: { type: String , required: true },
    tankArmamentAndArmour: { type: String , required: true },

    overallRatingSum: { type: Number , required: false },
    avgRating: { type: Number , required: false },
    uploadDate: { type: Date , required: true },
    lastUpdated: { type: Date , required: false },
    tankImagePfp: { type: String , required: false },
    photoCollection: { type: Array, required: false },
    voteCount: { type: Number, required: false },
});

module.exports = mongoose.model('Tank', tankSchema);