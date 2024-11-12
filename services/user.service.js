const { execSql } = require('../db/database.js');
const md5 = require('md5');

async function createUser(user) {
	const { username, password, role_id } = user;

	if (!user.username || !user.password || !user.role_id) {
		return {
			status: false,
			message: 'failed',
		};
	}
	const passHash = md5((password));


	let sql = 'INSERT INTO users (username,password,role_id) VALUES (?, ?,?)';
	const result = await execSql(sql, [username, passHash, role_id]);

	if (result.affectedRows === 0) {
		return {
			status: false,
			message: 'couldn\'t create',
		};
	}

	return {
		status: true,
		message: 'succeeded',
	};
}

async function searchUser(user) {
	let sql = 'SELECT `username` FROM users WHERE username = ? ';
	const result2 = await execSql(sql, [user]);

	if (result2.length > 0) {
		return {
			status: false,
			message: 'user already exist',
		};
	}


	return {
		status: true,
		message: 'OK',
		data: result2,
	};
}

module.exports = {
	createUser,
	searchUser,
};