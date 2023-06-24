const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


//?add the following parameters to user = {
/////?       admin role ,
/////?       add favorite tanks collection ,
/////?       //!implement the login save feature
//?}
const userSchema = new Schema({
    isAdmin: { type: Boolean , required: true },
    adminKey: { type: String , required: false },
    adminRole: { type: String , required: false },
    imagePfp: { type: String , required: false },
    
    username: { type: String , required: true },
    email: { type: String , required:true , unique: true },
    password: { type: String , required:true , minLength: 6 },
    firstName: { type: String , required: true },
    lastName: { type: String , required: true },
    country: { type: String , required: true },
    age: { type: Number , required: true },
    
    creationDate: { type: Date , required: true },
    currentLoginDate: { type: Date , required: false },
    lastLoginDate: { type: Date , required: false },
    lastAccountChanges: { type: Date , required: false},

    company: { type: String , required: false },
    publisher: { type: String , required: false },
    association: { type: String , required: false},
    favNation: { type: String , required: false },
    
    socialGroup: {
        socialType: { type: String , required: false },
        socialName: { type: String , required: false }
    },
    
    submittedSuggestions: [{ type: mongoose.Types.ObjectId , required: false , ref: 'Suggestion'}],
    
    favTanksList: [{ type: String , required: false }],
    likedTanksList: [{ type: String , required: false }],
    ratedTanksList:[{
        tankId:{ type: String , required: false },
        rating:{ type: Number, required: false }
    }],
});

//is used for validating unique data in the schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);