var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');


//connect to MongoDB
//var dburl = 'mongodb://mongo:27017/Folha20';
var dburl = 'mongodb://pi2docker.local:27017/Folha20';

app.get('/', function(req, res) {
  res.send("Not a valid endpoint!")
});

app.get('/records', function(req, res) {
    var resultArray = [];
    mongodb.connect(dburl, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('Record').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            var record = doc["fieldRecord"];
            record["tags"] = [
                //load tags
                function(callback){
                    db.collection('Tag').find({_id: {$in: ids}},  function(errTag, docsTags){
                            callback(docsTags);
                    });
                    /*for (var i = 0; i < doc["tags"].length; i++) {
                        var tag = db.collection('Tag').findOne({_id: doc["tags"][i]}, function(errTag, docTag){

                        });
                        tags.push(tag);
                    }*/
                }
            ];
            resultArray.push(record);
        }, function(){
            db.close();
            res.json(resultArray);
        });
    });
});

app.get('/tags', function(req, res) {
    var resultArray = [];
    mongodb.connect(dburl, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('Tag').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.json(resultArray);
        });
    });
});


app.listen(3000);
console.log('Running on port 3000:')
