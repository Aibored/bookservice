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
	},
	{
		path: '/books/:id',
		method: 'PUT',
		permissionId: 7,
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
	}
];

module.exports = routePermissions;