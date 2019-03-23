let jose = require('node-jose');
exports.Encrypt = function (key, data) {
    return new Promise(function (resolve, reject) {
        jose.JWE.createEncrypt(key).
            update(data).
            final().
            then(result => {
                // {result} is a JSON Object -- JWE using the JSON General Serialization
                resolve(result);
            }, err => {
                console.error(err);
                reject(err);

            });
    });
}
