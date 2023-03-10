const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//imports
const suggestionsRoutes = require('./routes/suggestions-routes');
const tanksRoutes = require('./routes/tanks-routes');
const adminsRoutes = require('./routes/admins-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error-model');

const server = express();

//we use bodyParser for parsing data from the html page for usage
server.use(bodyParser.json());

server.use('/uploads/images', express.static(path.join('uploads','images')));
server.use('/uploads/imagesOfTanks', express.static(path.join('uploads','imagesOfTanks')));


//used for port miss match and "CORS" error
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')
    next();
});

//!(Note that this defines the dir but the actual CRUD is in the given "usersRoutes")
server.use('/MainPage/Admin/SuggestionsDatabase', suggestionsRoutes);
server.use('/MainPage/Admin/TanksDatabase', tanksRoutes);
server.use('/MainPage/Admin/UsersDatabase', adminsRoutes);
server.use('/MainPage/User', usersRoutes);

//in case there is no response to a request
server.use((req, res ,next) => {
    const error = new HttpError('Could Not Find The Needed Route!',404);
    throw error;
});

//error handling middle ware function
server.use((error,req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, (err) => {
            console.log(err , "image was deleted");
        });
    }
    if(res.headersSent){
        return next(error);
    }//checks if a response was already sent
    
    //we set here to error for either dev defined or default response which is 500
    res.status(error.code || 500);
    res.json({message: error.message || 'An Unknown Error occurred!'});

});

//here we expand on connecting to the Database and 
// implement a catch if it does not work and also enter the link to our Database in the "connect()" method.
mongoose.connect(
    'mongodb+srv://bn233:bn2335813@tankarchidb.1aikh.mongodb.net/?retryWrites=true&w=majority'
)
.then(() => {
    console.log("Successfully connected to database")
    server.listen(5000);
})
.catch(err => {
    console.log(err)
});