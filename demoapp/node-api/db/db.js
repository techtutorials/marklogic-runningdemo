const fs = require('fs');
const marklogic = require('marklogic');
const { getSAMLToken } = require('../helper/redis')

let con = null;

const getOptions = (SAMLToken) => {
    return {
        port: '8060',
        authType: 'saml',
        ssl: true,
        token: SAMLToken,
        key: fs.readFileSync('./certs/localhost.key', 'ascii'),
        cert: fs.readFileSync('./certs/localhost.crt', 'ascii')
    }
};

const dbConnect = (SAMLToken) => {
    console.log("************Going to create DB Connection first cake************")
    con = marklogic.createDatabaseClient(getOptions(SAMLToken));
}

const getDBConnection = async () => {
    try {
        if(con){
            console.log("************using existing cake / connection************")
            return con
        }
        dbConnect(await getSAMLToken())
        return con
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getDBConnection, dbConnect }