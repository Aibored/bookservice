const database = require('./database.js');


async function createBook(book) {
	const { book_name, page_number, release_year } = book;

	if (!book_name || !page_number || !release_year) {
		return {
			status: false,
			message: 'failed',
		};
	}

	let sql = 'INSERT INTO books (book_name, page_number, release_year) VALUES (?, ?, ?)';
	await database.query(sql, [book_name, page_number, release_year]);

	return {
		status: true,
		message: 'succeded',
	};
}

module.exports = createBook;



