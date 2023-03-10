const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const suggestionSchema = new Schema({
    suggestionTitle:{ type: String, required: true },
    tankName: { type: String , required: true },
    nation: { type: String , required: true },
    combatRole: { type: String, required: true },
    
    era: { type: String , required: true },
    age: { type: String , required: true },
    servicePeriod: {
        startDate: { type: String , required: false },
        endDate: { type: String , required: false }
    },

    tankHistory: { type: String , required: true },
    tankServiceHistory: { type: String , required: true },
    tankProductionHistory: { type: String , required: true },
    tankArmamentAndArmour: { type: String , required: true },

    submissionDate: { type: Date , required: true },
    lastUpdatedDate: { type: Date , required: false},
    creator: { type: mongoose.Types.ObjectId , required: true , ref: 'User' },
    creatorPfp: { type: String , required: true },
    creatorName: { type: String , required: true },
    creatorAge: { type: Number , required: true },
    creatorEmail: { type: String , required: true },
    userDescription: { type: String , required: false },
});

module.exports = mongoose.model('Suggestion', suggestionSchema);