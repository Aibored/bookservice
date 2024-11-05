const express = require('express');
const cors = require('cors');
//const path = require('path');
const { execSql } = require('./db/database.js');
const app = express();
const {
	searchBook,
	deleteBook,
	searchID,
	listAll,
	listYear,
	createBook,
	updateBook,
	listOne,
	listBy,
	searchBookByAuthor,
} = require('./controllers/book_controller.js');
const {
	searchName,
	searchSurname,
	searchId,
	deleteAuthor,
	listAuthors,
	createAuthor,
	updateAuthor,
	listAuthorBy,
} = require('./controllers/author_controller.js');


const corsOptions = {
	origin: 'http://localhost:8081',
};

function error(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

//app.set("views", path.join(__dirname));
//app.set("view engine", "ejs");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({
		status: true,
		message: 'Kitap veri tabani haberlesme sistemine hos geldiniz.',
		data: null,
	});

});

app.get('/books', async (req, res) => {
	const bookAll = await listAll();

	if (!req.query.order || !req.query.by) {
		return res.json({
			status: true,
			message: 'OK',
			data: bookAll.data,
		});
	}

	const order = req.query.order;
	const by = req.query.by;

	const orderBy = await listBy(order, by);

	res.json({
		status: true,
		message: 'OK',
		data: orderBy.data,
	});


});

app.get('/books/releaseyear', async (req, res) => {
	const bookYear = await listYear();

	res.json({
		status: true,
		message: bookYear.message,
		data: bookYear.data,
	});

});

app.post('/books', async (req, res) => {
	const book = req.body;
	const bookName = book.book_name;
	const authorId = book.author_id;


	if (!book.book_name || !book.page_number || !book.release_year) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}


	const search = await searchBook(bookName);

	if (search.status === false) {

		return res.status(409).json({
			status: false,
			message: search.message,
			data: null,
		});
	}

	const search2 = await searchId(authorId);

	if (search2.status === false) {
		return res.status(400).json({
			status: false,
			message: search2.message,
			data: null,
		});
	}

	const create = await createBook(book);


	if (create.status === true) {
		return res.status(200).json({
			status: true,
			message: create.message,
			data: create.body,
		});
	}

	if (create.status === false) {
		return res.status(400).json({
			status: false,
			message: create.message,
			data: null,
		});
	}

});

app.put('/books/:id', async (req, res) => {
	const { id } = req.params;
	const { book_name, page_number, release_year } = req.body;


	if (!req.body.book_name || !req.body.page_number || !req.body.release_year) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

	const idSearch = await searchID(id);


	if (idSearch.status === false) {
		return res.status(400).json({
			status: false,
			message: idSearch.message,
			data: null,
		});
	}

	const bookUpdate = await updateBook(id, req.body);

	const idSearch2 = await searchID(id);


	if (bookUpdate.status == true) {
		return res.status(200).json({
			status: true,
			message: bookUpdate.message,
			data: idSearch2.data,
		});

	}
	else {
		return res.status(500).json({
			status: false,
			message: bookUpdate.message,
			data: null,
		});
	}
});

app.put('/authors/:id', async (req, res) => {
	const { id } = req.params;
	const { first_name, surname } = req.body;


	if (!req.body.first_name || !req.body.surname) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

	const idSearch = await searchId(id);


	if (idSearch.status === false) {
		return res.status(400).json({
			status: false,
			message: idSearch.message,
			data: null,
		});
	}

	const authorUpdate = await updateAuthor(id, req.body);

	if (!authorUpdate.status) {
		return res.status(500).json({
			status: false,
			message: authorUpdate.message,
			data: null,
		});
	}

	const idSearch2 = await searchId(id);

	return res.status(200).json({
		status: true,
		message: authorUpdate.message,
		data: idSearch2.data,
	});
});

app.delete('/books/:id', async (req, res) => {
	const { id } = req.params;


	const searching = await searchID(id);


	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const deleteBooks = await deleteBook(id);


	if (deleteBooks.affectedRows === 0) {
		return res.status(400).json({
			status: false,
			message: 'there is no book associated with this id',
			data: null,
		});
	}
	return res.status(200).json({
		status: true,
		message: 'successfully deleted. here is the deleted data:',
		data: searching.data,
	});
});

app.get('/books/:id', async (req, res) => {
	const { id } = req.params;

	const bookResult = await listOne(id);


	if (bookResult.status == false) {
		return res.status(400).json({
			status: false,
			message: bookResult.message,
			data: null,
		});
	}
	res.json(bookResult.data);

});

app.get('/books/author/:id', async (req, res) => {
	const { id } = req.params;
	const bookResult = await searchBookByAuthor(id);


	if (bookResult.status == false) {
		return res.status(400).json({
			status: true,
			message: bookResult.message,
			data: null,
		});
	}
	res.json({
		status: true,
		message: 'OK',
		data: bookResult.data,
	});
});

app.get('/authors', async (req, res) => {
	const authorAll = await listAuthors();

	if (!req.query.order || !req.query.by) {
		return res.json({
			status: true,
			message: 'OK',
			data: authorAll.data,
		});
	}

	const order = req.query.order;
	const by = req.query.by;

	const orderBy = await listAuthorBy(order, by);

	res.json({
		status: true,
		message: 'OK',
		data: orderBy.data,
	});

});

app.get('/authors/:id', async (req, res) => {
	const { id } = req.params;

	const authorResult = await searchId(id);


	if (authorResult.status == false) {
		return res.status(400).json({
			status: false,
			message: authorResult.message,
			data: null,
		});
	}
	res.json({
		status: true,
		message: 'OK',
		data: authorResult.data,
	});
});

app.post('/authors', async (req, res) => {
	const author = req.body;


	if (!author.first_name || !author.surname) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}


	const create = await createAuthor(author);


	if (create.status === true) {
		return res.status(200).json({
			status: true,
			message: create.message,
			data: create.body,
		});
	}

	if (create.status === false) {
		return res.status(400).json({
			status: false,
			message: create.message,
			data: null,
		});
	}

});

app.delete('/authors/:id', async (req, res) => {
	const { id } = req.params;


	const searching = await searchId(id);

	if (searching.status === false) {
		return res.status(400).json({
			status: false,
			message: searching.message,
			data: null,
		});
	}

	const searching2 = await searchBookByAuthor(id);

	if (searching2.status === true) {
		return res.status(400).json({
			status: false,
			message: 'you cannot delete this author',
			data: null,
		});
	}

	const deleteAuthors = await deleteAuthor(id);


	if (deleteAuthors.affectedRows === 0) {
		return res.status(400).json({
			status: false,
			message: 'there is no author associated with this id',
			data: null,
		});
	}
	return res.status(200).json({
		status: true,
		message: 'successfully deleted. here is the deleted data:',
		data: searching.data,
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});