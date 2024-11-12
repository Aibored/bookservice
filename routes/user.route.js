module.exports = app => {
	const control = require('../controllers/auth.controller.js');
  const user = require('../controllers/user.controller.js');
	var router = require("express").Router();

	router.get("/login", control.authUser);

	router.post("/signup", user.userCreate);

	app.use('/auth/', router);
}