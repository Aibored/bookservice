const { validateBook, validateAuthor, validateRequest } = require('../configs/validation');
const routePermissions = [
	{
		path: '/books/:id',
		method: 'GET',
		permissionId: 6,
	},
	{
		path: '/books',
		method: 'GET',
		permissionId: 6,
	},
	{
		path: '/books',
		method: 'POST',
		permissionId: 5,
		validation: validateBook,
	},
	{
		path: '/books/:id',
		method: 'PUT',
		permissionId: 7,
		validation: validateBook,
	},
	{
		path: '/books/:id',
		method: 'DELETE',
		permissionId: 8,
	},
	{
		path: '/books/author/:id',
		method: 'GET',
		permissionId: 6,
	},
	{
		path: '/author',
		method: 'POST',
		permissionId: 9,
		validation: validateAuthor,
	},
	{
		path: '/author',
		method: 'GET',
		permissionId: 10,
	},
	{
		path: '/author/:id',
		method: 'GET',
		permissionId: 10,
	},
	{
		path: '/author/:id',
		method: 'PUT',
		permissionId: 11,
		validation: validateAuthor,
	},
	{
		path: '/author/:id',
		method: 'DELETE',
		permissionId: 12,
	},
	{
		path: '/auth/signup',
		method: 'POST',
		permissionId: 1,
		validation: validateRequest,
	},

];

module.exports = routePermissions;