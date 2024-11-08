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
} = require('../services/book.service.js');
const {
	searchName,
	searchSurname,
	searchId,
	deleteAuthor,
	listAuthors,
	createAuthor,
	updateAuthor,
	listAuthorBy,
} = require('../services/author.service.js');
const { verifyUserAndPassword } = require('../auth/verify');
const { newToken } = require('../auth/jwt');

exports.bookCreate = async (req,res) =>{
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
};

exports.bookList = async (req,res) =>{
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
};

exports.bookRead = async (req,res) =>{
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
};

exports.bookByAuthor = async (req,res)=>{
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
};

exports.bookUpdate = async (req,res) =>{
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
};

exports.bookDelete = async (req,res) =>{
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
};

