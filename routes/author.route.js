module.exports = app => {
	const control = require('../controllers/author.controller.js');

	var router = require("express").Router();

	router.post("/",control.authorCreate);

	router.get("/", control.authorList);

	router.get("/:id", control.authorRead);

	router.put("/:id", control.authorUpdate);

	router.delete("/:id", control.authorDelete);


	app.use('/author', router);
}