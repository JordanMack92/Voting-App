'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var app      = express();
var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var xmlParser    = require('express-xml-bodyparser');

var configDB = require('./app/config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

 require('./app/config/passport')(passport, app); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(xmlParser());
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
//app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
routes(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);










//----------------clementine stuff----------------------------//

require('dotenv').load();
//require('./app/config/passport')(passport);

//mongoose.connect(process.env.MONGO_URI);
//mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

// app.use(session({
// 	secret: 'secretClementine',
// 	resave: false,
// 	saveUninitialized: true
// }));

//app.use(passport.initialize());
//app.use(passport.session());

//routes(app, passport);

// app.listen(port,  function () {
// 	console.log('Node.js listening on port ' + port + '...');
// });
