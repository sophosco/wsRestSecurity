'use strict';
//var inf = require('../config/jwtConfig');
//var keys = require('../config/keysConfig');
const jwt = require('jsonwebtoken');
var inf = require('../config/dev-env.js');
const log = global.log4js.getLogger(__filename);

exports.getTokenJWT = clientId => {
    var time = new Date().getTime();
    var payload = {
        jwtId: clientId.toString().substring(0, 4) + time
    };
    log.debug("this is options", inf.JWT_CONFIG);
    var token = jwt.sign(payload, keys.privateKEY, inf.JWT_CONFIG);
    if (token !== null) {
        return token;
    }

};

exports.verifyToken = (clientId, token) => {
    try {
        var ver = jwt.verify(token, keys.publicKEY, inf.JWT_CONFIG);
        console.log("jwtID:", ver.jwtId.substring(0, 4));
        console.log("clientID:", clientId.toString().substring(0, 4));
        if ((ver.jwtId.substring(0, 4)) == (clientId.toString().substring(0, 4))) {
            return true;
        }
    } catch (err) {
        console.error(err);
        return err;
    }
};