const express = require('express');
const cors = require('cors');
const database = require('./database.js');
const createBook = require('./core.js');

const app = express();

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

app.get('/books', (req, res) => {

	res.json({
		message: 'this is books route',
	});

});

app.post('/books', async (req, res) => {
  const book =req.body;

	const create = await createBook(book);

	console.log(create);
//	if(create.status === true){
//		res.status(200).json({message:create.message});
//	}
//	else {
//		res.status(400).json({message:create.message});
//	}

	if (create.status === false) {
		return res.status(400).json({message:create.message});
	}

	return  res.status(200).json({message:create.message});
//
//	console.log('testes')

});

//require()();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});