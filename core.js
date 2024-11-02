const { con } = require('./database.js');
const { execSql } = require('./database');


async function createBook(book) {
	const { book_name, page_number, release_year } = book;

	if (!book_name || !page_number || !release_year) {
		return {
			status: false,
			message: 'failed',
		};
	}

	let sql = 'INSERT INTO books (book_name, page_number, release_year) VALUES (?, ?, ?)';
	const result = await execSql(sql, [book_name, page_number, release_year]);

	if (result.affectedRows === 0) {
		return {
			status: false,
			message: 'couldn\'t create',
		};
	}

	return {
		status: true,
		message: 'succeded',
	};
}

module.exports = createBook;



