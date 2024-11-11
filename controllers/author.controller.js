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
const { searchBookByAuthor } = require('../services/book.service');

exports.authorCreate = async (req, res) => {
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
};

exports.authorList = async (req, res) => {
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
};

exports.authorRead = async (req, res) => {
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
};

exports.authorUpdate = async (req, res) => {
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
};

exports.authorDelete = async (req, res) => {
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
};