const connection = require('../config/connection')
 
const getUserPostsQuery=(user_id)=> connection.query('select posts.id, posts.title, posts.content, posts.user_id, count(DISTINCT CASE WHEN votes.type = \'up\' and votes.post_id=posts.id THEN votes.id END) from posts left join votes on posts.id = votes.post_id where posts.user_id = $1 group by posts.id',[user_id])
 
module.exports = getUserPostsQuery
