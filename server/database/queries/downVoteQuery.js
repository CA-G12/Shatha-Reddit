const connection = require('../config/connection')

const downVoteQuery =(post_id, user_id)=> 
connection.query(' delete from votes where post_id=$1 and user_id=$2', [post_id, user_id])

module.exports = downVoteQuery

// 'insert into votes (post_id, user_id, type) values($1,$2,$3) returning *',[post_id, user_id,'down']