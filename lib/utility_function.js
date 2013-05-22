var qrCode = require('qrcode-npm');

module.exports.getUserData = function(serviceName, user){
    if(serviceName.toLowerCase()=="facebook"){
        var location = user.profile._json ? user.profile._json.location ? user.profile._json.location.name.split(',') : [] : [];
        var userProfile = {
            "firstName":user.profile._json.first_name,
            "lastName":user.profile._json.last_name,
            company: user.profile._json ? user.profile._json.work && user.profile._json.work.length>0 ? user.profile._json.work[0].employer.name : "" : "",
            designation: user.profile._json ? user.profile._json.work && user.profile._json.work.length>0 ? user.profile._json.work[0].position.name : "" : "",
            city: location.length>0 ? location[0] : "",
            country: location.length>1 ? location[1].trim() : "",
            email: user.profile.emails && user.profile.emails.length > 0 ? user.profile.emails[0].value : ""
        }
        return userProfile;
    }
    if(serviceName.toLowerCase()=="linkedin"){
        var userProfile = {
            "firstName":user.profile._json.firstName,
            "lastName":user.profile._json.lastName,
            company: user.profile._json.positions ? user.profile._json.positions.values && user.profile._json.positions.values.length>0 ? user.profile._json.positions.values[0].company.name : "" : "",
            designation: user.profile._json.positions ? user.profile._json.positions.values && user.profile._json.positions.values.length>0 ? user.profile._json.positions.values[0].title : "" : "",
            email: user.profile._json.emailAddress,
            mobile: user.profile._json.phoneNumbers ? user.profile._json.phoneNumbers.values && user.profile._json.phoneNumbers.values.length > 0 ? user.profile._json.phoneNumbers.values[0].phoneType=='mobile' ? user.profile._json.phoneNumbers.values[0].phoneNumber : "" : "" : "",
            landLine : user.profile._json.phoneNumbers ? user.profile._json.phoneNumbers.values && user.profile._json.phoneNumbers.values.length > 0 ? user.profile._json.phoneNumbers.values[0].phoneType!='mobile' ? user.profile._json.phoneNumbers.values[0].phoneNumber : "" : "" : ""
        }
        return userProfile;
    }

    return {};
}

module.exports.generateQrCode = function(data){
    var qr = qrCode.qrcode(4, 'M');
    qr.addData(data);
    qr.make();

    var imageTag = qr.createImgTag(4);
    return imageTag;
}
