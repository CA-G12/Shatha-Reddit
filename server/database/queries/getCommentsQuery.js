const connection = require('../config/connection');

const getcommentsQuery = (postId) => connection.query('select * from comments where post_id=$1', [postId]);

module.exports = getcommentsQuery;
