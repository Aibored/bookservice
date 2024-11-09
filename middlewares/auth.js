const { verifyToken, newToken } = require('../auth/jwt.js');

async function authoratize(req,res) {
	const header = req.header('Authorization');
	const bearer = header.split(' ');
	const token = bearer[1];

	if (req.path !== '/auth/login') {
		const verify = await verifyToken(token);
		if (verify.status == false) {
			return res.json({
				status: false,
				data: verify,
			});
		}
		return{
			status:true,
			data:verify,
		};
	}
}
module.exports = authoratize;