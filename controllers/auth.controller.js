const { verifyUserAndPassword } = require('../auth/verify');
const { newToken } = require('../auth/jwt');

exports.authUser= async (req,res)=>{
	const username = req.body.username;
	const password = req.body.password;
	const user = {
		username,
		password,
	};

	const vPass = await verifyUserAndPassword(username, password);

	if (vPass.status === false) {
		return res.status(400).json({
			status: false,
			message: vPass.message,
			data: null,
		});
	}


	const token = await newToken(user);

	res.json({
		status: true,
		message: 'here is your token',
		data: token,
	});
}