// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
// importing modules 
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database')

//connect to database
mongoose.connect(config.database, {
  useMongoClient: true,
  /* other options */
});

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

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
var admin = express(); // the sub app

admin.get('/', function (res) {
  res.send('Admin Homepage');
});

app.use('/admin', admin); // mount the sub app

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = join(process.cwd(), 'dist');

//adding middleware - cors
app.use(cors());

//body - parsera
app.use(bodyparser.json());

//adding middleware - cors
admin.use(cors());

//body - parsera
admin.use(bodyparser.json());

//passport Middleware 

app.use(passport.initialize());
app.use(passport.session());

//passport Middleware 
admin.use(passport.initialize());
admin.use(passport.session());

require('./config/passport')(passport);



const users = require('./route/frontend/users');
const adminUser = require('./route/admin/users');
//users routes
app.use('/users', users);
admin.use('/users', adminUser);


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
