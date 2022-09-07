const bcrypt = require('bcryptjs');

const hashPassword = (password) => bcrypt.hash(password, 15);

const comparePassword = (password, dbPassword) => bcrypt.compare(password, dbPassword);

module.exports = { hashPassword, comparePassword };