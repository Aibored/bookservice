const { execSql } = require('../db/database');


async function roleCheck(verify, number) {
	try {
		const roleCheck = await execSql('SELECT permission_id  FROM bookapi.`role permissions` WHERE role_id= ?', [verify.role_id]);
		const roleResult = JSON.parse(JSON.stringify(roleCheck));

		const check = roleResult.filter((rolePermissions) => rolePermissions.permission_id === number);


		if (check.length === 0) {
			return {
				status: false,
				message: 'access denied',
				data: null,
			};
		}
		return {
			status: true,
			message: 'access granted',
			data: null,
		};

	} catch (err) {
		return {
			status: 'error',
		};

	}
}

module.exports = roleCheck;