const connection = require('../config/connection');

const addPostQuery = (title, content, user_id) => connection.query('insert into posts (title,content,user_id) values ($1,$2,$3) returning *', [title, content, user_id]);

module.exports = addPostQuery;
