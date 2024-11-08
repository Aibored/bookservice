const express = require('express');
const cors = require('cors');
const md5 = require('md5');
const { execSql } = require('./db/database.js');
const app = express();

const { verifyUserAndPassword } = require('./auth/verify.js');
const { verifyToken, newToken } = require('./auth/jwt.js');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');


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
app.use(async (req,res,next)=>{
	const header = req.header('Authorization');
	const bearer = header.split(' ');
	const token = bearer[1];

	if(req.path !== '/auth/login'){
		const verify = await verifyToken(token);

		if (verify.status == false){
			return res.json({
				status:true,
				data:verify
			});
		}
	}

	next()
});

app.get('/', async (req, res) => {

	res.json({
		status: true,
		message: 'welcome to book_api',
		data: null,
	});

});


require("./routes/book.route.js")(app);
require("./routes/author.route.js")(app);
require("./routes/user.route.js")(app);

app.all('*', async(req,res)=>{
	res.status(404).json({
		status:false,
		message:'this url is forbidden',
		data: null,
	})

})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});