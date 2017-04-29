var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Record = require('./models/record.js');
Tag = require('./models/tag');
SyncJournal = require('./models/syncJournal');

//connect to MongoDB
mongoose.connect('mongodb://mongo:27017/Folha20')
//mongoose.connect('mongodb://pi2docker.local:27017/Folha20');
//mongoose.connect('mongodb://127.0.0.1:27017/Folha20')
var db = mongoose.connections;

app.get('/', function(req, res) {
  res.send("Not a valid endpoint!")
});

app.get('/records', function(req, res) {
    var amount = 10;
    var page = req.query.page ? req.query.page : 0;
    var skip = amount * page;           
    Record.getRecords(function(err, records){
        if (err) {
            throw err;
        }else{            
            res.json(records);
        }
  },skip, amount);
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

app.get('/tagStats', function(req, res) {
    var tagId = req.query.tagId;
    var timestampform = req.query.from;
    var timestampto = req.query.to;  
    if (timestampform) {
       var datefrom = new Date(timestampform*1000);  
    } else{
        var datefrom = null
    }
    if (timestampto) {
       var dateto = new Date(timestampto*1000);  
    } else{
        var dateto = null
    }
        
    Record.getTagStats(tagId, datefrom, dateto,
        function(err, journal){
        if (err) {
            throw err;
        }else{
            res.json(journal);
        }
  });
//stats a retornar:
//numero de records
//somatorio abs do val de todos o records
//percentagem de entre todos os da mesma sub categoria (saio ou entrou) - qual o valor percentual de mercearia comparado com todas as despesas?
//percentagem assumindo o valor total de todas as receitas + balance do ultimo record do mes passado 
//
//
//

});

app.listen(3000);
console.log('Running on port 3000:')
