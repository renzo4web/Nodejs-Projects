// Validation
const Joi = require('joi');

// register Val

const registerValidation = (reqBody) => {

    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),

        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    });

    return schema.validate(reqBody);
}
const loginValidation = (reqBody) => {

    const schema = Joi.object({

        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),

        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    });

  return schema.validate(reqBody);

}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation

