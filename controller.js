const { con } = require('./database.js');
const { execSql } = require('./database');


async function readByID(id) {
	let sql = 'SELECT * FROM books WHERE id = ?';
	const [find] = await execSql(sql, [id]);

}




//async function readAll(req, res, next) {
//	let sql2 = 'SELECT * from books ';
//	const [findAll] = await execSql(sql2);
//	if(!findAll.length) return res.status(204).json({message: "list is empty"});
//
//	return res.status(200).json({})

//}

module.exports = readByID;