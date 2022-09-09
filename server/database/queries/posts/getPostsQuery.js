const connection = require('../../config/connection');

const getPostsQuery = () => connection.query('select posts.id, posts.title, posts.content, posts.user_id, users.user_name, count(DISTINCT CASE WHEN votes.type = \'up\' and votes.post_id=posts.id THEN votes.id END) from posts left join votes on posts.id = votes.post_id join users on posts.user_id = users.id group by posts.id, posts.title, posts.content, posts.user_id, users.user_name');

module.exports = getPostsQuery;
// connection.query('select posts.id, posts.title, posts.content, posts.user_id,count( votes.id), votes.type from posts left join votes on posts.id = votes.post_id where votes.type=\'up\' group by posts.id, posts.title, posts.content, posts.user_id, votes.type');
// select posts.id, posts.title, posts.content, posts.user_id,count(DISTINCT CASE WHEN votes.type = 'up' and votes.post_id=posts.id THEN votes.id END) from posts left join votes on posts.id = votes.post_id group by posts.id, posts.title, posts.content, posts.user_id