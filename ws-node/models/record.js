var mongoose = require('mongoose');
var tag = require('./tag.js');

//Record Schema
var recordSchema = mongoose.Schema({
    fieldRecord:{
        balance:{
            type: Number,
            require: true
        },
        val:{
            type: Number,
            require: true

        },
        movDate:{
            type: Date,
            require: true,
            default: new Date(0)
        },
        valDate:{
            type: Date,
            require: true,
            default: new Date(0)
        },
        description:{
            type: String,
            require: true
        }
    },
    tags:[{type : mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

var Record = module.exports = mongoose.model('Record', recordSchema, 'Record');

//get records
module.exports.getRecords = function(callback, limit){
    Record.find(callback).limit(limit);
}
