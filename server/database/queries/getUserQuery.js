const connection = require('../config/connection');

const getUserQuery = (user_id) => connection.query('select user_name from users where id=$1', [user_id]);

module.exports = getUserQuery;
