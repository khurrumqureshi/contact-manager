var config = require('../config'),
    MongoClient = require('mongodb').MongoClient;

module.exports.connectDatabase = function(callback){
    MongoClient.connect(config.connectionString, config.dbOptions, function(err, db) {
        if(err){
            console.log(err);
            process.exit(1);
        }

        module.exports.users = db.collection('users');
        callback(db);
    })
}

