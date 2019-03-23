/* eslint-disable no-undef */
/* eslint-disable no-console */
let jose = require('node-jose');
exports.generatesignature = function (key, data) {
    return new Promise(function (resolve, reject) {
        jose.JWS.createSign(key).
            update(data).
            final().
            then(result => {
                resolve(result);
            }, err => {
                console.error(err);
                reject(err);
            });
    });

}
exports.vefifysignature = function (key, signature) {
    let opts = {
        algorithms: [
            "*",
            "!HS*"
        ]
    };
    jose.JWS.createVerify(key, opts).
        verify(signature).
        then(signature).
        then(result => {
            resolve(result);
        }, err => {
            console.error(err);
            reject(err);
        });
}