const Joi = require('joi');

const PASSWORD_REGEX = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])',
);

const BOOK_REGEX = new RegExp(
    '^(?=.*[0-9])',
);

const bookSchema = Joi.object().keys({
    book_name: Joi.string().alphanum().required(),
    page_number: Joi.string().pattern(BOOK_REGEX).required(),
    release_year: Joi.string().pattern(BOOK_REGEX).required(),
    author_name: Joi.string().pattern(BOOK_REGEX).required(),
});

const authorSchema = Joi.object().keys({
    first_name: Joi.string().alphanum().required(),
    surname: Joi.string().alphanum().required(),
})


const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(3).required(),
    role_id: Joi.string().required(),
});




async function validateRequest(body) {
    const result = schema.validate(body);
    if (result.error) {
        return ({
            status: false,
            error: result.error.details[0].message,
        });
    }
    console.log(result);
    return {
        status: true,
        message: 'OK',
        data: result
    };

}

async function validateBook(body) {
    const result = bookSchema.validate(body);
    if (result.error) {
        return ({
            status: false,
            error: result.error.details[0].message,
        });
    }
    console.log(result);
    return {
        status: true,
        message: 'OK',
        data: result
    };

}

async function validateAuthor(body) {
    const result = authorSchema.validate(body);
    if (result.error) {
        return ({
            status: false,
            error: result.error.details[0].message,
        });
    }
    console.log(result);
    return {
        status: true,
        message: 'OK',
        data: result
    };

}


module.exports = {
    validateRequest,
    validateBook,
    validateAuthor,
};