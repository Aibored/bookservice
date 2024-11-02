const database = require('./database.js');

async function searchBook(book2){
	const {book_name} = book2;

	let sql = 'SELECT * FROM books(book_name) WHERE book_name = ? ';
	await database.query(sql, [book_name]);

//	if()



}

