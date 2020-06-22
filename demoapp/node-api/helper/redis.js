const redis = require("redis");
//Redis client
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);
let email = "";
const getSAMLToken = () => {
    console.log("Inside Redis...............");
    console.log(email);
    return new Promise((resolve, reject) => {
        redisClient.hgetall(email, (err, data) => {
            return !err && data ? resolve(data.samlToken) : reject(err)
        })
    });
}

function setRedisKey(userEmail){
    email = userEmail;
}

module.exports = {
    getSAMLToken, setRedisKey
}