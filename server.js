const express = require('express');
const cors = require('cors');
const { execSql } = require('./database.js');
const createBook = require('./core.js');
const app = express();


const corsOptions = {
	origin: 'http://localhost:8081',
};


async function searchBook(book_name) {
	let sql = 'SELECT `book_name` FROM books WHERE book_name = ? ';
	const result2 = await execSql(sql, [book_name]);

	if (result2.length > 0) {
		return {
			status: false,
			message: 'book already exist',
		};
	}
//console.log(result2);

	return {
		status: true,
		message: 'OK',
	};
}


function error(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

	database.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
		if (error) throw error;
		console.log({
			error,
			results,
			fields,
			result: results[0].solution,
		});
	});


	res.json({ message: 'Kitap veri tabani haberlesme sistemine hos geldiniz.' });
});

app.get('/books',async (req, res) => {
	const bookAll = await execSql('SELECT * FROM books');
	console.log(bookAll);

	res.json({
		message: 'this is books route',
		bookAll,
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
		console.log(search);
		return res.status(409).json({ message: search.message });
	}


	const create = await createBook(book);

	console.log({
		create,
	});

	if (create.status === true) {
		return res.status(200).json({ message: create.message });
	}

	if (create.status === false) {
		return res.status(400).json({ message: create.message });
	}

});



app.get('/books/:id',async (req,res) => {
	const {id} = req.params;
	console.log(req.params);
	const bookResult = await execSql('SELECT * FROM books WHERE id = ?', [id]);
	console.log(bookResult);

	if(bookResult.length == 0){
		return res.status(400).json({message:'this is a invalid request'});
	}
	res.json(bookResult);

});




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});