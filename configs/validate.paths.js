const {validateRequest,validateAuthor,validateBook} = require('../configs/validation.js');

const pathValidation =[
    {
        path: '/books/:id',
        method:'POST',
        validation: validateBook(book),
    },
    {
        path: '/books/:id',
        method:'PUT',
        validation: validateBook(book),
    },
    {
        path: '/authors/:id',
        method:'POST',
        validation: validateAuthor(author),
    },
    {
        path: '/authors/:id',
        method:'PUT',
        validation: validateAuthor(author),
    },
];

module.exports = pathValidation;