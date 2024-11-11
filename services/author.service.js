const { execSql } = require('../db/database.js');


async function searchName(name) {

	const nameSearch = await execSql('SELECT `first_name` FROM authors WHERE first_name = ?', [name]);

	if (nameSearch.length == 0) {
		return {
			status: false,
			message: 'cannot find',
		};
	}


	return {
		status: true,
		message: 'OK',
		data: nameSearch,
	};
}

async function searchSurname(surname) {

	const surnameSearch = await execSql('SELECT `surname` FROM authors WHERE surname = ?', [surname]);

	if (surnameSearch.length == 0) {
		return {
			status: false,
			message: 'cannot find',
		};
	}


	return {
		status: true,
		message: 'OK',
		data: surnameSearch,
	};
}

async function searchId(id) {
	const idSearch = await execSql('SELECT * FROM authors WHERE author_id = ?', [id]);


	if (idSearch.length === 0) {
		return {
			status: false,
			message: 'this id is not exist',
			data: null,
		};
	}
	return {
		status: true,
		message: '1 data found',
		data: idSearch,
	};
}

async function deleteAuthor(idAuthor) {

	const result = await execSql('DELETE FROM authors WHERE author_id = ?', [idAuthor]);

	return {
		status: true,
		message: 'successfully deleted',
		data: null,
	};
}

async function listAuthors() {
	const authorAll = await execSql('SELECT * FROM authors ORDER BY first_name');

	return {
		status: true,
		message: 'this is authors route',
		data: authorAll,
	};
}

async function createAuthor(author) {
	const { first_name, surname } = author;

	if (!first_name || !surname) {
		return {
			status: false,
			message: 'failed',
		};
	}

	let sql = 'INSERT INTO authors (first_name,surname) VALUES (?, ?)';
	const result = await execSql(sql, [first_name, surname]);

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

async function updateAuthor(id, author) {
	const { first_name, surname } = author;

	const authorUp = await execSql('UPDATE authors SET first_name = ?, surname = ? WHERE author_id  = ?', [first_name, surname, id]);

	if (authorUp.affectedRows == 1) {
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

async function listAuthorBy(param, param2) {
	const results = await execSql(`SELECT * FROM authors ORDER BY ${param} ${param2}`);

	return {
		status: true,
		message: 'sorted by',
		data: results,
	};
}

module.exports = {
	searchName,
	searchSurname,
	searchId,
	deleteAuthor,
	listAuthors,
	createAuthor,
	updateAuthor,
	listAuthorBy,
};