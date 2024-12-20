const { execSql } = require('../db/database.js');
const md5 = require('md5');

console.log(md5('12345'));


async function verifyUserAndPassword(username, password) {
	const passHash = md5((password));

	const passSearch = await execSql('SELECT * FROM users WHERE username =? and password = ?', [username, passHash]);
	if (passSearch.length == 0) {
		return {
			status: false,
			message: 'cannot find',
		};
	}


	return {
		status: true,
		message: 'OK',
		data: passSearch[0],

	};
}

module.exports = {
	verifyUserAndPassword,
};