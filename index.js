// importing modules 
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const config = require('./config/database')

//connect to database
mongoose.connect(config.database);

// on connection 
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

// on error 
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log("error in database connection" + err);
    }
});

const app = express();
var admin = express(); // the sub app

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // /admin
  res.send('Admin Homepage');
});

app.use('/admin', admin); // mount the sub app

const users = require('./route/users');

//port no.
const port = process.env.PORT || 8080;

//adding middleware - cors
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body - parsera
app.use(bodyparser.json());

//passport Middleware 
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//users routes
app.use('/users', users);


app.get('/', (req, res, next) => {
    res.send('hello');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.listen(port, () => {
    console.log('server started at port:' + port);
});