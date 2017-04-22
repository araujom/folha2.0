var mongoose = require('mongoose');

//SyncJournal Schema
var syncJournalSchema = mongoose.Schema({
    date:{
        type: Date,
        require: true
    },
    newEntries:{
        type: Number,
        require: true
    },
});

var SyncJournal = module.exports = mongoose.model('SyncJournal', syncJournalSchema, 'SyncJournal');

//get SyncJournal
module.exports.getSyncJournal = function(callback, limit){
    Tag.find(callback).limit(limit);
}
