/* eslint-disable no-console */
/* eslint-disable camelcase */
let jose = require('node-jose');
// eslint-disable-next-line no-undef

let keystore = jose.JWK.createKeyStore();

exports.generate_key = function () {
    return new Promise(function (resolve, reject) {
        jose.JWK.createKey("oct", 256).
            then(result => {
                /*
                 * {result} is a jose.JWK.Key
                 * {result.keystore} is a unique jose.JWK.KeyStore
                 */

                let key = result.toJSON(true);
                console.log(key);
                keystore.add(key, "json").
                    then(keyadd => {
                        // {result} is a jose.JWK.Key
                        let keysave = keyadd;
                        console.log("add keystore", keysave);
                    }, err => {
                        console.log(err);
                        reject(err);
                    });

                resolve(key);

            }, err => {
                console.log(err);
                reject(err);
            });
    });
}
exports.getkey = function (kid) {
    return new Promise(function (resolve, reject) {
        try {
            let key = keystore.get(kid);
            console.log(key);
            resolve(key);
        } catch (err) {
            reject(err);
        }
    });
}