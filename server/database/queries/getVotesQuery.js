const connection = require('../config/connection');
const up ="up"
const getVotesQuery = (post_id) => connection.query(`select * from votes where post_id = $1 AND type=${up} `, [post_id]);

module.exports = getVotesQuery;
