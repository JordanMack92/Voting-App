'use strict';

var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var pollSchema = require(path+'/app/models/polls');
var User = require(path + '/app/models/users');
var navi = require(path + '/app/controllers/navigationController.server.js');
var mongo = require('mongodb').MongoClient;




module.exports = function (app, passport) {
    
    
    //========================================//
    //==========DELETE DATABASES==============//
    //-=======================================//
    //  app.get('/deletedb', function(req,res){
    //     mongo.connect("mongodb://localhost:27017/vote-app",function(err,db){
    //       db.collection('polls').dropIndexes();
    //     });
    //     pollSchema.remove({}, function(err){
    //       if(err) throw err;
    //     });
    //     User.remove({}, function(err){
    //       if(err) throw err; 
    //     });
    // });
    //=========================================//
    
    app.get('/polls/:query', function(req,res){
        var query = req.params.query;
       
        pollSchema.findOne( { _id: query }, function(err,poll){
            if (err) throw err;
            
              res.render(path+'/public/showpoll', {
                  poll: poll
              });
        }); 
    });
    
  
    app.get('/navigation', navi.navbar);
    
    
    
    app.get('/polls', function(req,res){
        
       pollSchema.find({}, function(err,polls){
           if(err) throw err;
           
           res.render(path + '/public/polls.ejs', {
               polls: polls
           });
       }); 
    });
    
    
    app.post('/polls/create', isLoggedIn, function(req,res){
       
       var newPoll = new pollSchema;
       newPoll.question = req.body.question;
       newPoll.user = req.user.local.email;
       newPoll.name = req.user.local.name;
       newPoll.options = [];
       
       if (req.body.option1 == req.body.option2){
           res.render(path + '/public/createpoll.ejs');
       }
       else {
       
       var json  = {
           option: req.body.option1,
           votes: 0
       };
       newPoll.options.push(json);
       json.option = req.body.option2;
       
       newPoll.options.push(json);
    
       newPoll.save(function(err){
          if (err) {
           res.send(err);
           
          }
          else {
              res.redirect('/polls');
          }
       });
    }
    });
    
    app.get('/create', isLoggedIn, function(req,res){
       res.render(path+'/public/createpoll.ejs', {
           user: req.user
       }); 
    });
	
	app.get('/', alreadyLoggedIn, function(req, res) {
        res.render(path + '/public/index.ejs', {
            user : req.user // get the user out of session and pass to template
        }); // load the index.ejs file
    });

    app.get('/home', isLoggedIn, function(req,res){
        res.render(path+ '/public/home.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', alreadyLoggedIn, function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render(path + '/public/login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', alreadyLoggedIn ,function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render(path + '/public/signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render(path + '/public/profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    app.post('/signup', passport.authenticate('local-signup', {
        
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



	 function isLoggedIn (req, res, next) {
	 	if (req.isAuthenticated()) {
	 		return next();
	 	} else {
	 		res.redirect('/');
	 	}
	 }
	 
	 function alreadyLoggedIn (req, res, next){
	 	if (req.isAuthenticated()) {
	 		res.redirect('/home');
	 	}
	 	else {
	 		return next();
	 	}
	 }
	 
};
