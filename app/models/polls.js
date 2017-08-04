'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pollSchema = Schema({
    question: String,
    options: [{
        _id:false,
        option: {type:String, unique: true},
        votes: Number
    }],
    user: String,
    name: String
});


module.exports = mongoose.model('Poll', pollSchema);