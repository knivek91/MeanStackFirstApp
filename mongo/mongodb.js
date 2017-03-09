var moongose = require('moongose');

var MongoDb = function () {
    
    var url = 'mongodb://KevinUserDB:creativecalo10@ds151028.mlab.com:51028/testmongodb';
    
    // connect with mongo using moongose;
    moongose.connect(url);
    
    return {
        
        saveDoc: function (document) {
            document.save(function (err) {
                
            });
            return '';
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
        , errorHandler: function errorHandler(err, data) {
            if(err)
                throw err;
            return data;
        }
    };
};

module.exports = MongoDb;