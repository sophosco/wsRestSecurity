'use strict'


exports.signOp = function (env) {
	var signOptions = {
		issuer: env.JWT_ISSUER,
		subject: env.JWT_SUBJECT,
		audience: env.JWT_AUDIENCE,
		expiresIn: env.JWT_EXPIRES_IN,
		algorithm: env.JWT_ALGORITHM
	};
	return signOptions;
}
