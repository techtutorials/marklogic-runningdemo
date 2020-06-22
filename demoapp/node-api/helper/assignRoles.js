var appRoles = require('../config/appRolesConfig');
function assignRoles(userADGroups) {
    var level = [];
    var userLevel = 0;
    if((typeof userADGroups) === 'string' ){
        //convert into array
        userADGroups = userADGroups.split();
    }
    // console.log(userADGroups);
    
    userADGroups.forEach(userRole => {
        //  console.log(userRole);
        //  console.log("=============");    
        appRoles.roles.forEach(adRole => {
            // console.log(adRole.key);
            if (userRole === adRole.key) {
                level.push(adRole.level);
            }
        })
    });
    if (level.length > 0) {
        userLevel = Math.min(...level);
    }
    else {
        userLevel = -1;
    }
    return userLevel;
}


module.exports = assignRoles