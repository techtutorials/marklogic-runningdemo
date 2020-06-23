var parseString = require('xml2js').parseString;

const XMLtoObject = (result) => {
    let resultJSON
    parseString(result, function (err, result) {
        // console.log("Inside XML OBJECT...........")
        // console.dir(result);
        resultJSON = result
    });
    return resultJSON
}

export default XMLtoObject

