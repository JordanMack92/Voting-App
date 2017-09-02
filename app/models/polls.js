'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var arrayUniquePlugin = require('mongoose-unique-array');


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

pollSchema.plugin(arrayUniquePlugin);

module.exports = mongoose.model('Poll', pollSchema);