
module.exports = app => {
  const control = require('../controllers/book.controller.js');
	var router = require("express").Router();


	router.post("/",control.bookCreate);

	router.get("/", control.bookList);

	router.get("/:id", control.bookRead);

	router.put("/:id", control.bookUpdate);

	router.delete("/:id", control.bookDelete);

	router.get("/author/:id", control.bookByAuthor);

	app.use('/books', router);
}