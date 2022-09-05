const connection = require('../config/connection');

const addUserQuery=(username, email, password)=> connection.query('insert into users (user_name,email,password)values ($1,$2,$3) returning *',[username,email,password])

module.exports = addUserQuery;