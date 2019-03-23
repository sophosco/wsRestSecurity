let jose = require('node-jose');
exports.Decrypt = function (key, data) {
    return new Promise(function (resolve, reject) {
        jose.JWE.createDecrypt(key).
        decrypt(data).
            then(result => {
                // {result} is a JSON Object -- JWE using the JSON General Serialization
                resolve(result);
            }, err => {
                console.error(err);
                reject(err);

            });
    });
}
