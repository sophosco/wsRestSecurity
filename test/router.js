/* eslint-disable no-undef, no-console */
/** Import the dependencies for testing **/
const chai = require('chai');
const chaiHttp = require('chai-http');
let app = null;


/** Configure chai **/
chai.use(chaiHttp);
chai.should();

describe("Routing express - state services (UP)", () => {

    /** Exec before of run tests of the describe **/
    before(done => {
        try {
            // eslint-disable-next-line global-require
            app = require('../app.js');
            console.info('--> Successfully in prepare service - app.js \n');
            done();
        } catch (error) {
            console.error('--> Error in prepare service - app.js');
            process.exit(1);
        }
    });
    it("/POST - /services/security/getkey/", done => {
        try {
            chai.request(app).post('/services/security/getkey/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Get Encrypt Data');
            process.exit(0);
        }
    });
    it("/POST - /services/security/generatesignature/", done => {
        try {
            chai.request(app).post('/services/security/generatesignature/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Get Jwt Token');
            process.exit(0);
        }
    });
    it("/POST - /services/security/verifysignature/", done => {
        try {
            chai.request(app).post('/services/security/verifysignature/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service verifysignature');
            process.exit(0);
        }
    });
    it("/POST - /services/security/encrypt/", done => {
        try {
            chai.request(app).post('/services/security/encrypt/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service encrypt');
            process.exit(0);
        }
    });
    it("/POST - /services/security/decrypt/", done => {
        try {
            chai.request(app).post('/services/security/decrypt/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Save  Validate Token');
            process.exit(0);
        }
    });
    it("/POST - /services/security/getJwtToken/", done => {
        try {
            chai.request(app).post('/services/security/getJwtToken/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Save  Validate Token');
            process.exit(0);
        }
    });
    it("/POST - /services/security/verifyJwtToken/", done => {
        try {
            chai.request(app).post('/services/security/verifyJwtToken/').set('content-type', 'application/json').send({}).end(res => {
                res.should.have.status(500);
                done();
            });
        } catch (error) {
            console.error('--> Error in test by service Save  Validate Token');
            process.exit(0);
        }
    });
});