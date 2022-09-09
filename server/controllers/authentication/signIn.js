const joi = require('joi');
const { comparePassword } = require('../../utils/customBcrypt');
const {checkUserEmailQuery} = require('../../database/queries/index');
const customizedError = require('../../utils/customError');
const { jwtSign } = require('../../utils/customJwt');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).max(20)
      .required(),
  });

  schema.validateAsync(req.body).then((result) => checkUserEmailQuery(email))
    .then((data) => data.rows[0]).then((data) => {
      if (!data) {
        throw new customizedError(400, 'Email Not Found');
      } else {
        comparePassword(password, data.password).then((result) => {
          if (result) {
            return jwtSign({ user_id: data.id, user_name: data.user_name, isLogged: 'true' });
          }
          throw new customizedError(400, 'wrong password');
        }).then((token) => {
          if (token) {
            res.status(200).cookie('token', token, { httpOnly: true })
              .json('sign in success');
          } else {
            throw new customizedError(500, 'sign in failed');
          }
        });
      }
    })
    .catch((err) => next(err));
};

module.exports = signIn;
