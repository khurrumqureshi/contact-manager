module.exports.main = {
    port: process.env.PORT || 3000,
    debug: true,
    version: "0.1"
};

module.exports.twitterApp = {
    consumerKey:"A3LA67bf7HlJDRNuUuLRA",
    consumerSecret:"feclKCiSz3L5gehv5WuatdKQytkLwUtS4WPMhkFZ2I",
    callbackURL: "http://businesscard-manager.herokuapp.com/auth/service/twitter/callback"
}

module.exports.facebookApp = {
    clientID:"602158726476045",
    clientSecret:"986758b2fb1e30fa9f0bbf57ba96d512",
    callbackURL: "http://businesscard-manager.herokuapp.com/auth/service/facebook/callback"
}

module.exports.linkedInApp = {
    consumerKey: "4bl7aygtxz09",
    consumerSecret: "EQio1Nbrog3I9MEs",
    callbackURL: "http://businesscard-manager.herokuapp.com/auth/service/linkedin/callback",
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'location', 'phone-numbers','main-address','positions']
}

module.exports.dbOptions = {
    server:{
        'auto_reconnect': true,
        'poolSize': 20
    }
};

module.exports.connectionString = 'mongodb://admin:admin123@widmore.mongohq.com:10010/Users'
module.exports.url = "http://localhost:3000/";
