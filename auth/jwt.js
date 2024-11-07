const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { token } = require('mysql/lib/protocol/Auth');

const tokenPayload = (user) => {
	return {
		user: user.username,
		userid: user.user_id,
	};
};

const newToken = (user) => {
	const payload = tokenPayload(user);
	const options = {
		expiresIn: 60 * 60,
		algorithm: 'HS256',
		audience: 'test',
	};

	return jwt.sign(payload, 'test123', options);
};

async function verifyToken(token) {
	try {
		const decoded = jwt.verify(token, 'test123');

		return {
			status: true,
			message: 'OK',
		};
	} catch (err) {
		return {
			status: false,
			message: err.message,
		};
	}

}


module.exports = {
	newToken,
	verifyToken,
};