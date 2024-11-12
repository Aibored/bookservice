const Joi = require('joi');

const PASSWORD_REGEX = new RegExp(
	'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])',
);


const schema = Joi.object().keys({
	username: Joi.string().alphanum().required(),
	password: Joi.string().pattern(PASSWORD_REGEX).min(3).required(),
	role_id: Joi.string().required(),
});


async function validateRequest(body){
	const result = schema.validate(body);
	if (result.error){
		return ({
			status:false,
			error: result.error.details[0].message,
		});
	}
	console.log(result);
	return{
		status:true,
		message:'OK',
		data:result
	};

}
module.exports = validateRequest;