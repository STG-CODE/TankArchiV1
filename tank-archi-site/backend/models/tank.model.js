const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const tankSchema = new Schema({
    tankName: { type: String , required: true },
    nation: { type: String , required: true },
    combatRole: { type: String, required: true },
    
    era: { type: String , required: false },
    age: { type: Number , required: false },
    servicePeriod: {
        startDate: { type: String , required: true },
        endDate: { type: String , required: true }
    },

    tankHistory: { type: String , required: true },
    tankServiceHistory: { type: String , required: true },
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