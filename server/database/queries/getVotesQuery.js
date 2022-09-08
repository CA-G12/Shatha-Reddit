const connection = require('../config/connection');

const getVotesQuery = (post_id) => connection.query(' select id , user_id ,post_id, type, count(post_id) from votes where post_id=$1 and type=\'up\' group by votes.id', [post_id]);

module.exports = getVotesQuery;
