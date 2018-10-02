const Joi = require("joi");
const schema = {
  first: Joi.string()
    .alphanum()
    .min(1)
    .max(30)
    .required(),
  last: Joi.string()
    .min(1)
    .max(30)
    .required(),
  sex: Joi.string()
    .min(1)
    .max(10)
    .required(),
  birthdate: Joi.date().required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.number().required(),
  street: Joi.string()
    .min(5)
    .max(35)
    .required(),
  city: Joi.string()
    .min(3)
    .max(20)
    .required(),
  state: Joi.string()
    .min(2)
    .max(2)
    .required(),
  zip: Joi.number()
    .integer()
    .positive()
    .required(),
  rec: Joi.string()
    .alphanum()
    .min(1)
    .max(40)
    .required(),
  recWeb: Joi.string()
    .min(7)
    .max(40)
    .required(),
  find: Joi.string(),
  instructions: Joi.string(),
  condition: Joi.string(),
  id: Joi.required(),
  recImg: Joi.required(),
  selfie: Joi.required()
};
module.exports.formValidate = data => {
  const result = Joi.validate(data, schema, {
    abortEarly: false
  });
  if (!result.error) return null;
  const { details } = result.error;
  const errors = {};
  details.map(e => {
    errors[e.path] = e.message;
  });
  return Object.keys(errors).length === 0 ? null : errors;
};
