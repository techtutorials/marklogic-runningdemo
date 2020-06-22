const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
//const fetch = require("node-fetch");
const redis = require("redis");
//Redis client
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);
const { setRedisKey } = require('../helper/redis');
const assignRoles = require('./assignRoles');


require('dotenv').config();
const fs = require('fs');
var user = null;

function createUserObjFromAD(email, userGivenName, userADGroups) {
    // console.log("^^^^^^^^^^^", userADGroups)
    if (userADGroups.length <= 0) {
        throw new Error("User is not part of any AD group in Azure. Please contact admin")
    }
    var userRole = assignRoles(userADGroups);
    if (userRole <= 0) {
        throw new Error('User is not part of any AD group for MarkLogic apps. Please contact app owner.');
    }
    user = {
        email: email,
        role: userRole,
        name: userGivenName
    }
    return user;
}

function getUserFromSAML(email) {
    // console.log("******getuserfromSAML*********", email);
    if (email) {
        redisClient.hgetall(email, (err, data) => {
            if (err) return null;
            if (data) {
                user = {
                    email: email,
                    role: data.role,
                    name: data.name
                }
                return user
            } else {
                return null;
            }
        });
    }
    else {
        return null;
    }
}

function configureUser(profile, fn) {

    if (!profile.nameID) {
        console.log("User email id not found in profile");
        return fn(null, false);
    }
    email = profile.nameID;
    const userADGroups = profile[process.env.CLAIMS_GROUP];
    const userGivenName = profile[process.env.CLAIMS_GIVEN_NAME]
    // console.log("Giveennnnnnnnnnn Name", userGivenName)
    user = createUserObjFromAD(email, userGivenName, userADGroups);
    return fn(null, user);

}

function findByEmailId(email, fn) {
    if (!email) {
        return fn(null, false);
    }
    if (!user) {
        // console.log("*************User is {}. Creating new")
        user = getUserFromSAML(email);
        return fn(null, user);
    }
    return fn(null, user);
    
};




passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use(new SamlStrategy(
    {
        path: process.env.CALLBACK_URL,
        entryPoint: process.env.ENTRY_POINT,
        issuer: process.env.ISSUER,
        cert: fs.readFileSync(process.env.AD_APP_CERT, 'utf-8')
    },
    function (profile, done) {
        // console.log('Profile.........',profile);
        configureUser(profile, function (err, user) {
            if (err) {
                console.log("USER EMAILID NOT FOUND");
                return done(err);
            }
            return done(null, user);
        });
    })
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: process.env.JWT_SECRET,
};


passport.use('jwt', new JWTstrategy(opts, (payload, done) => {
    try {
        console.log("=======Inside JWT Strategy==========");
        // console.log(payload);
        findByEmailId(payload.email, function (err, user) {
            if (err) {
                throw new Error(err);
            }
            if (user) {
                console.log("*****************", user)
                setRedisKey(user.email);
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    } catch (err) {
        console.log(err);
        done(err);
    }
}),
);




