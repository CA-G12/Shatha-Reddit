const connection = require('../config/connection');

const getPostsQuery = () => connection.query(' select posts.id, posts.title, posts.content, posts.user_id , users.user_name from posts join users on posts.user_id = users.id');

module.exports = getPostsQuery;
// connection.query('select posts.id, posts.title, posts.content, posts.user_id,count( votes.id), votes.type from posts left join votes on posts.id = votes.post_id where votes.type=\'up\' group by posts.id, posts.title, posts.content, posts.user_id, votes.type');