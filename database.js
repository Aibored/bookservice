const mysql = require('mysql');

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

module.exports = con;