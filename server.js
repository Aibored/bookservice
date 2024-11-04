const express = require('express');
const cors = require('cors');
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
} = require('./book_controllers/controller.js');


const corsOptions = {
	origin: 'http://localhost:8081',
};

function error(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ message: 'Kitap veri tabani haberlesme sistemine hos geldiniz.' });
});

app.get('/books', async (req, res) => {

	const bookAll = await listAll();

	res.json({
		message: 'here is the full list of books we have',
		data: bookAll.data,
	});


});

app.get('/books/releaseyear', async (req, res) => {
	const bookYear = await listYear();

	res.json({
		message: bookYear.message,
		data: bookYear.data,
	});

});

app.post('/books', async (req, res) => {
	const book = req.body;
	const bookName = book.book_name;


	if (!book.book_name || !book.page_number || !book.release_year) {
		return res.status(400).json({ message: 'try to post accurate format' });
	}


	const search = await searchBook(bookName);

	if (search.status === false) {

		return res.status(409).json({ message: search.message });
	}


	const create = await createBook(book);


	if (create.status === true) {
		return res.status(200).json({ message: create.message });
	}

	if (create.status === false) {
		return res.status(400).json({ message: create.message });
	}

});

app.put('/books/:id', async (req, res) => {
	const { id } = req.params;
	const { book_name, page_number, release_year } = req.body;


	if (!req.body.book_name || !req.body.page_number || !req.body.release_year) {
		return res.status(400).json({ message: 'try to post accurate format' });
	}

	const idSearch = await searchID(id);


	if (idSearch.status === false) {
		return res.status(400).json({ message: idSearch.message });
	}

	const bookUpdate = await updateBook(id, req.body);

	const idSearch2 = await searchID(id);


	if (bookUpdate.status == true) {
		return res.status(200).json({ message: bookUpdate.message, data: idSearch2.data });

	}
	else {
		return res.status(500).json({ message: bookUpdate.message });
	}
});

app.delete('/books/:id', async (req, res) => {
	const { id } = req.params;


	const searching = await searchID(id);


	if (searching.status === false) {
		return res.status(400).json({ message: searching.message });
	}

	const deleteBooks = await deleteBook(id);


	if (deleteBooks.affectedRows === 0) {
		return res.status(400).json({ message: 'there is no book associated with this id' });
	}
	return res.status(200).json({ message: 'successfully deleted. here is the deleted data:', data: searching.data });
});

app.get('/books/:id', async (req, res) => {
	const { id } = req.params;

	const bookResult = await listOne(id);


	if (bookResult.status == false) {
		return res.status(400).json({ message: bookResult.message });
	}
	res.json(bookResult.data);

});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});