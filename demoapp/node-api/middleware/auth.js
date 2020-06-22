//const passport = require('passport');
//const passportHelper = require('./passport');
//const requireAuth = passport.authenticate('jwt', {session=false});

function checkSAMLAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("========Authentication is successful=======");
      next();
    } else {
      res.redirect('/app/login')
    }
}

function checkJWTAuthentication(req, res, next) {
 
}
module.exports = {checkSAMLAuthentication, checkJWTAuthentication}