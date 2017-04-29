var mongoose = require('mongoose');
var Tag = require('./tag.js');

//Record Schema
var recordSchema = mongoose.Schema({    
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
    movDate:{
        type: Date,
        require: true,
        default: new Date(0)
    },
    description:{
        type: String,
        require: true
    },
    tags:[{type : mongoose.Schema.Types.ObjectId, ref: 'Tag'}]
});

var Record = module.exports = mongoose.model('Record', recordSchema, 'Record');

//get records
module.exports.getRecords = function(callback, skip, limit){
    Record.find().sort({movDate: 'desc'}).populate('tags').skip(skip).limit(limit).exec(callback);
}

function getTagValSum(tagID , datefrom, dateto, callback){
    var queryAnds = [];
    if (tagID) {
        queryAnds.push(
            {
                tags: { 
                    $in:[
                        mongoose.Types.ObjectId(tagID)
                    ] 
                }
            }
        );
    }    
    if (datefrom) {
        queryAnds.push(
            {
                movDate: {
                    $gte: datefrom
                }
            }
        );
    }
    if (dateto) {
        queryAnds.push( 
            {
                movDate: {
                    $lte: dateto
                }
            }
        );
    }
    
    var query = { 
                    $and: queryAnds
                }
    
    var soma = Record.aggregate([        
    { 
        $match: query
        /*{ 
            $and: [ 
                {
                    tags:{ 
                        $in:[mongoose.Types.ObjectId(tagID)]
                    }
                }
                ,
                {
                    movDate : {
                        $lt: new Date(1488240000 * 1000) 
                    }
                }
            ]
        } */
    },
    {
        $group: {
            _id: '',
            val: { $sum: '$val' },
            count: { $sum: 1 }
        }
    }, 
    {
        $project: {
            _id: 0,
            soma: '$val',
            count: '$count'
        }
    }], function(err, tagValSum) {                
        callback(err, tagValSum[0]['soma'], tagValSum[0]['count']);    
    });
};

function sumTagEntrouPlusBalancePreviousRecord(datefrom, dateto, callback){
    getTagValSum("58de9cf5d869b087367e7a9b" , datefrom, dateto, function(err, tagValSum, count) {
        if(datefrom){
            Record.findOne({
                movDate: {
                    $lt: datefrom
                }
            }).sort({movDate: 'desc'}).exec(function(err, res){                
                console.log('tag val sum: ' + tagValSum + res["balance"]);
                callback(err, res["balance"] + tagValSum);
            });
        }else{
            callback(err, tagValSum);
        }
    });
    
}



module.exports.getTagStats = function(tagID, datefrom, dateto, callback){
    getTagValSum(tagID , datefrom, dateto, function(err, tagValSum, tagCount) {
        if (err) {
            throw err;
        }else{
            //Tag.getTagById(tagID, function(err, result){
            Tag.getRootTag(tagID, function(err, rootTag){ 
                sumTagEntrouPlusBalancePreviousRecord(datefrom, dateto,  function(err, sumBalance) {                    
                        getTagValSum(rootTag['_id'] , datefrom, dateto, function(err, saioValSum, saioCount) {
                            var res = {
                                tagSum: tagValSum,
                                tagCount: tagCount,
                                sumBalance: sumBalance,                                
                                sumTagBalance: tagValSum/sumBalance,
                                saioValSum: saioValSum,
                                saioCount: saioCount,
                                sumTagSaio: tagValSum/saioValSum
                            }
                            callback(err, res);
                        });                                        
                });


                
               
               
            });   
        }         
 });
 
}








 