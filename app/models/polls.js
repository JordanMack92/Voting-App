'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var optionSchema = require(process.cwd() + '/app/models/options.js');

var pollSchema = Schema({
    question: String,
    options: [{
        option: String,
        votes: Number
    }],
    user: String
});


module.exports = mongoose.model('Poll', pollSchema);