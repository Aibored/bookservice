const express = require('express');
const cors = require('cors');
const md5 = require('md5');
const { execSql } = require('./db/database.js');
const app = express();
const authoratize = require('./middlewares/auth.js');
const { verifyUserAndPassword } = require('./auth/verify.js');
const { verifyToken, newToken } = require('./auth/jwt.js');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { verify } = require('jsonwebtoken');
const roleCheck = require('./middlewares/role_check.js');


const corsOptions = {
	origin: 'http://localhost:8081',
};

function error(status, msg) {
	const err = new Error(msg);
	err.status = status;
	return err;
}

const routePermissions = [
	{
		path: '/books/:id',
		method: 'get',
		permissionId: 1,
	},
	{
		path: '/author/:id',
		method: 'get',
		permissionId: 2,
	},
	{
		path: '/books',
		method: 'post',
		permissionId: '3',
	},
];

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
	console.log(req.path);
	const auth = await authoratize(req, res);

	const method = 'get';
	const findRoutesByMethod = routePermissions.filter((routePermission) => routePermission?.method === method);
	console.log({
		findRoutesByMethod,
	});


	let findPath = {};
	for (let routePermission of findRoutesByMethod) {
		var routeMatcher = new RegExp(routePermission.path.replace(/:[^\s/]+/g, '([\\w-]+)'));
		const regexFindPath = req.path.match(routeMatcher);
		if (regexFindPath) {
			findPath = routePermission;
			break;
		}
	}

	console.log({
		findPath,
	});
//	const result = auth.data;
//	const role = await roleCheck(result,2);


	next();
});

app.get('/', async (req, res) => {

	res.json({
		status: true,
		message: 'welcome to book_api',
		data: null,
	});

});


require('./routes/book.route.js')(app);
require('./routes/author.route.js')(app);
require('./routes/user.route.js')(app);

app.all('*', async (req, res) => {
	res.status(404).json({
		status: false,
		message: 'this url is forbidden',
		data: null,
	});

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
