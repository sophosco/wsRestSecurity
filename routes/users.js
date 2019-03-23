var express = require('express');
var router = express.Router();

/* GET users listing. */
var keycontroller = require('../Controllers/Key_Controller');
let signaturecontroller = require('../Controllers/Signature_Controller');
let encryptcontroller = require('../Controllers/Encrypt_controller');
let decryptcontroller = require('../Controllers/Decrypt_controller.');
var jwtTokenController = require('../Controllers/getjwttoken.controller');

router.get('/services/security/generatekey/', keycontroller.GenerateKeyController);
router.post('/services/security/getkey/', keycontroller.GetKeyController);
router.post('/services/security/generatesignature/', signaturecontroller.GenerateSignature);
router.post('/services/security/verifysignature/', signaturecontroller.VerifySignature);
router.post('/services/security/encrypt/', encryptcontroller.EncryptData);
router.post('/services/security/decrypt/', decryptcontroller.DecryptData);
router.post('/services/security/getJwtToken/', jwtTokenController.getToken);
router.post('/services/security/verifyJwtToken/', jwtTokenController.verifyToken);
module.exports = router;
