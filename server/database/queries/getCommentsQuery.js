const connection = require('../config/connection');

const getCommentsQuery = (postId) =>
 connection.query(' select comments.id ,comments.post_id,comments.user_id,comments.comment ,users.user_name from comments join  users on comments.user_id= users.id where comments.post_id=$1', [postId]);

module.exports = getCommentsQuery;
