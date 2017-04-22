var mongoose = require('mongoose');

var stringArraySchema = mongoose.Schema(
    [{type: String}]
);

//Tag Schema
var tagSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    matrixRules:Array
});

var Tag = module.exports = mongoose.model('Tag', tagSchema, 'Tag');

//get records
module.exports.getTags = function(callback, limit){
    Tag.find(callback).limit(limit);
}
