var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Record = require('./models/record.js');
Tag = require('./models/tag');
SyncJournal = require('./models/syncJournal');

//connect to MongoDB
//mongoose.connect('mongodb://mongo:27017/Folha20')
mongoose.connect('mongodb://pi2docker.local:27017/Folha20');
var db = mongoose.connections;

app.get('/', function(req, res) {
  res.send("Not a valid endpoint!")
});

app.get('/records', function(req, res) {
    Record.getRecords(function(err, records){
        if (err) {
            throw err;
        }else{
            for (var i = 0; i < records.length; i++) {
                records[i]=records[i].populate('tags');
            }
            res.json(records);
        }
  });
});

app.get('/tags', function(req, res) {
    Tag.getTags(function(err, tags){
        if (err) {
            throw err;
        }else{
            res.json(tags);
        }
  });
});

app.get('/syncJournal', function(req, res) {
    SyncJournal.getSyncJournal(function(err, journal){
        if (err) {
            throw err;
        }else{
            res.json(journal);
        }
  });
});

app.listen(3000);
console.log('Running on port 3000:')
