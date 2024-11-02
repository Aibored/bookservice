const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"mypass",
	database: "bookapi"
});


con.connect((error) => {
	if (error) {
		if (error.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('Database connection was closed.');
		}
		if (error.code === 'ER_CON_COUNT_ERROR') {
			console.error('Database has too many connections.');
		}
		if (error.code === 'ECONNREFUSED') {
			console.error('Database connection was refused.');
		}
	} else {
		console.log('Database connected');
	}
});

function execSql(statement, values) {
	return new Promise(function (res, rej) {
		con.query(statement, values, function (err, result) {
			if (err) rej(err);
			else res(result);
		});
	});
}


module.exports = {
	con,
	execSql,
};
