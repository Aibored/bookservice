const { execSql } = require('../db/database.js');

async function searchBook(book_name) {
	let sql = 'SELECT `book_name` FROM books WHERE book_name = ? ';
	const result2 = await execSql(sql, [book_name]);

	if (result2.length > 0) {
		return {
			status: false,
			message: 'book already exist',
		};
	}


	return {
		status: true,
		message: 'OK',
	};
}

async function deleteBook(IDbook) {

	await execSql('DELETE FROM books WHERE id = ?', [IDbook]);

	return {
		status: true,
		message: 'successfully deleted',
		data: null,
	};

}

async function searchID(ID) {
	const idsearch = await execSql('SELECT * FROM books WHERE id = ?', [ID]);

	console.log(idsearch);


	if (idsearch.length === 0) {
		return {
			status: false,
			message: 'this id is not exist',
			data: null,
		};
	}
	return {
		status: true,
		message: '1 data found',
		data: idsearch,
	};

}

async function listAll() {
	const bookAll = await execSql('SELECT * FROM books ORDER BY book_name');

	return {
		status: true,
		message: 'this is books route',
		data: bookAll,
	};
}

async function listYear() {
	const bookAllyear = await execSql('SELECT book_name,release_year FROM books');

	return {
		status: true,
		message: 'this is all release years of books',
		data: bookAllyear,

	};


}

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

async function updateBook(id, book) {
	const { book_name, page_number, release_year } = book;

	const bookUp = await execSql('UPDATE books SET book_name = ?, page_number = ?, release_year = ? WHERE id = ?', [book_name, page_number, release_year, id]);

	if (bookUp.affectedRows == 1) {
		return {
			status: true,
			message: 'successfully updated',
		};

	}
	else {
		return {
			status: false,
			message: 'failed',
		};
	}
}

async function listOne(IDbook) {
	const results = await execSql('SELECT * FROM books WHERE id = ?', [IDbook]);

	if(results.length==0){
		return{
			status: false,
			message: 'cannot find',
			data:results
		};
	}

	return {
		status: true,
		message: 'successes',
		data:results,
	};
}

module.exports = {
	searchBook,
	deleteBook,
	searchID,
	listAll,
	listYear,
	createBook,
	updateBook,
	listOne,
};