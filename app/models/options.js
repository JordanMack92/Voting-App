'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var optionSchema = Schema({
    option: String,
    votes: Number
});

module.exports = mongoose.model('Options', optionSchema);