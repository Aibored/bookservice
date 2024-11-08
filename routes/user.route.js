module.exports = app => {
	const control = require('../controllers/auth.controller.js');

	var router = require("express").Router();

	router.get("/login", control.authUser);

	app.use('/auth/', router);
}