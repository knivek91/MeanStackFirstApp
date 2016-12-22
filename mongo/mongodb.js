var guid = require('guid');
var Promise = require('promise');

var MongoDb = function () {
    
    var mongoClient = require('mongodb').MongoClient
        , assert = require('assert')
        , url = 'mongodb://localhost:27017/test';
    
    return {
        
        insertDoc: function (data) {
            mongoClient.connect(url, function (err, db) {
                var collection = db.collection('documents');
                data['guid'] = guid.raw();
                collection.insert(data);
                db.close();
                return '';
            });
        }
        , readDocs: function() {
            return new Promise(function(resolve, reject) {
                mongoClient.connect(url, function (err, db) {
                    if(err) {
                        reject(err);
                    } else {
                        var collection = db.collection('documents');
                        var result = collection.find({}).toArray(function (err, items) {
                            if(err) { reject(err); }
                            db.close();
                            resolve(items);
                        });
                    }
                })
            });
        }
    };
};

module.exports = MongoDb;