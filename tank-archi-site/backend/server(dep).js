//TODO:Create\Add "find" methods and test them out

//TODO:Improve and implement more parameters for the "models" using the "mongoose" site information and manifest.

//TODO:Images are refereed to with urls so depending on the case we will not be able to save them.


//TODO:Create\Add error\catchers\tries.

//we create our Express var
const express = require('express');

//we create our Cors var
const cors = require('cors');

//we use mongoose here to help us connect to mongoose database
const mongoose = require('mongoose');

//we use this for vars in our dotenv file
require('dotenv').config();

//here we create our express server
const app = express();
const port = process.env.PORT || 3000;

//here we have our URI var which is used to access the mongoose database and start our connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true});

//here we have our massage for when we successfully connect to the mongoose database
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('TankArchi is connected to the MongoDB database, Connection was successful!')
})
//here we declare our middle ware variables, last one being used for reading json
app.use(cors());
app.use(express.json());

//here we use the route files from the "routes" folder and import them
//Note: data can also be seen in the root url using the "/"
const suggestionsRouter = require('./routes/suggestions');
const usersRouter = require('./routes/users');
const tanksRouter = require('./routes/tanks');

//and here we use the routers
//!Note: might need to change for the site because of URL dependencies and overall site routing
app.use('/suggestions', suggestionsRouter);
app.use('/users', usersRouter);
app.use('/tanks', tanksRouter);

//here is our listing massage for when the server is running
app.listen(port,() => {
    console.log('TankArchi Server Is Running On Port : ' + port);
});