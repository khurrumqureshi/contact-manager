var utilFunction = require('../lib/utility_function');
var userController = require('../controllers/user');

module.exports.route = function(app, passport) {
    app.get('/',function(req, res){
        res.render('login',{loginFailure:typeof req.session.loginStatus == "undefined" ? false : req.session.loginStatus});
    })

    app.post('/login',function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                req.session.loginStatus = true;
                return res.redirect('/'); }
            req.session.loginStatus = false;
            req.session.user = user;
            res.redirect('/profile');

        })(req, res, next);
    });

    app.get('/register',function(req,res){
        res.render('index',{user:JSON.stringify(req.session.user ? req.session.user : {})});
    })

    app.get('/profile',function(req,res){
        res.render('profile',{user:JSON.stringify(req.session.user ? req.session.user : {})});
    })

    app.get('/logout',function(req, res){
        req.session.user = {};
        res.redirect('/');
    })

    app.get('/auth/service/:service_name',
        function(req, res, next){
            var options={};

            if(req.params.service_name=="linkedin"){
                options={ scope: ['r_fullprofile','r_emailaddress','r_contactinfo']};
            }
            passport.authenticate(req.params.service_name,options)(req,res,next);
        });

    app.get('/auth/service/:service_name/callback',function(req, res, next) {
        passport.authenticate(req.params.service_name, function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/'); }
            req.session.user = utilFunction.getUserData(req.params.service_name,user);
            res.redirect('/register');

        })(req, res, next);
    });

    app.get('/profile/:id',userController.getUser)
    app.get('/qr-code/:id',userController.getQrCode)
    app.post('/save',userController.saveUser);
}