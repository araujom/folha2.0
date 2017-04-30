var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Record = require('./record.js');

var stringArraySchema = mongoose.Schema(
    [{type: String}]
);

//Tag Schema
var tagSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    matrixRules:Array,
    father: {type : mongoose.Schema.Types.ObjectId, ref: 'Tag'}
});

var Tag = module.exports = mongoose.model('Tag', tagSchema, 'Tag');
tagSchema.plugin(deepPopulate)

//get tags
module.exports.getTags = function(callback, limit){
    Tag.find(callback).populate('father').limit(limit);
};

//get tag by 
module.exports.getTagById = function(tag_id, callback){
    Tag.findOne({_id: tag_id}, callback).populate({ path: 'father', populate: { path: 'father' } });    
};

//get root tag by tag id
module.exports.getRootTag = function(tag_id, callback){    
    //Tag.findById(tag_id).deepPopulate('father.father.father').exec(callback);        
    function recursive(err, tag){      
        //console.log(tag);  
        if(typeof tag === 'string' || tag instanceof String){
            Tag.findById(tag).exec(recursive);
        //}else if('father' in tag){
        }else if(tag['father'] === null || tag['father'] === undefined){            
            callback(err, tag);             
        }else{
            Tag.findById(tag.father).exec(recursive);            
        }        
    };
    recursive(null, tag_id);
};

