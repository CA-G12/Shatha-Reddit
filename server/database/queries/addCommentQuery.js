const connection = require('../config/connection')

const addCommentQuery= (comment,user_id ,post_id)=> connection.query('insert into comments (comment,user_id,post_id) values ($1, $2,$3) returning *',[comment,user_id ,post_id])

module.exports = addCommentQuery;