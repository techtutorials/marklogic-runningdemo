const jwt = require("jsonwebtoken");
const expiration = process.env.DB_ENV === 'testing' ? 100 : 60 * 60 * 24 // expires in 24 hours;
require('dotenv').config();

function signToken(user) {
    var email = user.email;
    var name = user.name;
    var role = user.role;
    
    signedToken = jwt.sign({ email: email, name:name, role: role }, process.env.JWT_SECRET, {
        expiresIn: expiration //other configuration options
    });
    return signedToken;
}

module.exports = signToken