const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    isAdmin: { type: Boolean , required: true },
    adminKey: { type: String , required: false },
    imagePfp: { type: String , required: false },
    
    username: { type: String , required: true },
    email: { type: String , required:true , unique: true },
    password: { type: String , required:true , minLength: 6 },
    firstName: { type: String , required: true },
    lastName: { type: String , required: true },
    country: { type: String , required: true },
    age: { type: Number , required: true },
    
    creationDate: { type: Date , required: true },
    lastLoginDate: { type: Date , required: false },
    lastAccountChanges: { type: Date , required: false},

    company: { type: String , required: false },
    publisher: { type: String , required: false },
    association: { type: String , required: false},
    
    socialGroup: {
        socialType: { type: String , required: false },
        socialName: { type: String , required: false }
    },
    
    submittedSuggestions: [{ type: mongoose.Types.ObjectId , required: false , ref: 'Suggestion'}],
    favNation: { type: String , required: false },
    favTanksList: [{ type: mongoose.Types.ObjectId , required: false , ref: 'Tank'}],
    ratedTanks: { type: Number , required: false },
});

//is used for validating unique data in the schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);