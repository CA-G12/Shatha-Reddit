const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const jwtSign = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, secret, (err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

const verifyJwt = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      reject(err);
    } else {
      resolve(decoded);
    }
  });
});

module.exports = { jwtSign, verifyJwt };
