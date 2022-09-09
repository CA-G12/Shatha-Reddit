const connection = require('../../config/connection')

const upVoteQuery =(post_id, user_id)=> 
connection.query('insert into votes (post_id, user_id, type) values($1,$2,$3) returning *',[post_id, user_id,'up'])

module.exports = upVoteQuery