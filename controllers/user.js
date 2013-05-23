var db = require('../lib/db-config');
var ObjectID = require('mongodb/node_modules/bson/lib/bson').ObjectID;
var config = require('../config');
var utilFunction = require('../lib/utility_function');

module.exports.saveUser=function(req,res,next){
    db.users.findOne({email:req.body.email},function(err,user){
        if(user==null){
            insertUser(req.body,function(newUser){
                var imageTag = utilFunction.generateQrCode(newUser.profile_url);
                newUser["imageTag"] = imageTag;
                req.session.user = newUser;
                res.redirect('/profile');
            })
        }
        else{
            updateUser(user._id.toString(),req.body,function(newUser){
                newUser["_id"] = user._id.toString();
                var imageTag = utilFunction.generateQrCode(user.profile_url);
                newUser["imageTag"] = imageTag;
                req.session.user = newUser;
                res.redirect('/profile');
            })
        }
    })
}

module.exports.getUser = function(req,res,next){
    db.users.findOne({_id:new ObjectID(req.params.id)},function(err,user){
        res.send({profile:user});
    })
}

module.exports.getQrCode = function(req, res, next){
    db.users.findOne({_id:new ObjectID(req.params.id)},function(err,user){
        var imageTag = utilFunction.generateQrCode(user.profile_url);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body>"+imageTag+"'</body></html>");
    })
}

function insertUser(user,callback){
    user["_id"] = new ObjectID();
    user["profile_url"] = config.url+"profile/"+user._id;
    db.users.insert(user,{safe:true},function(err,objects){
        callback(user);
    })
}

function updateUser(userId,data,callback){
    var user = {};
    for(var key in data){
        if(data[key] && data[key].length>0)
        user[key] = data[key];
    }
    delete user._id;
    db.users.update({_id:new ObjectID(userId)},{$set:user},function(err,count){
        callback(user);
    })
}

