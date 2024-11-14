const { createUser, searchUser } = require('../services/user.service.js');
const { searchBook, createBook } = require('../services/book.service');
const { searchId } = require('../services/author.service');
const {validateRequest,validateAuthor,validateBook} = require('../configs/validation.js');

exports.userCreate = async (req,res) =>{
	const user = req.body;
	const username = user.username;



	if (!user.username || !user.password || !user.role_id) {
		return res.status(400).json({
			status: false,
			message: 'try to post accurate format',
			data: null,
		});
	}

  const validate = await validateRequest(user);
	console.log(validate);
	if(validate.status===false){
		return res.status(400).json({
			status:false,
			message:'try accurate format',
			error: validate.error,
		});
	}

	const search = await searchUser(username);

	if (search.status === false) {

		return res.status(409).json({
			status: false,
			message: search.message,
			data: null,
		});
	}


	const create = await createUser(user);


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