const joi = require('joi');
const checkUserEmailQuery = require('../../database/queries/checkUserEmailQuery');
const customizeError = require('../../utils/customError');
const { hashPassword } = require('../../utils/customBcrypt');
const addUserQuery = require('../../database/queries/addUserQuery');
const { jwtSign } = require('../../utils/customJwt');


const signUp = (req, res, next) => {
  const {
    username, email, password, confirmPassword,
  } = req.body;

  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).max(20)
      .required(),
    confirmPassword: joi.string().required().valid(joi.ref('password')),
  });

  schema.validateAsync(req.body).then((data) => checkUserEmailQuery(email))
    .then((result) => {
      if (result.rows.length) {
        throw new customizeError(400, 'Email is Already Exists');
      } else {
        return hashPassword(password);
      }
    }).then((hashedPassword) => addUserQuery(username, email, hashedPassword))
    .then((result) => jwtSign({ user_id: result.rows[0].id, user_name: result.rows[0].user_name, isLogged: 'true' })
    .then((token) => {
      if (token) {
        res.status(200).cookie('token', token, { httpOnly: true }).json('sign up success');
      } else {
        throw new customizeError(500, 'sign up failed');
      }
    }))
    .catch((err) => next(err));
};
module.exports = signUp;
