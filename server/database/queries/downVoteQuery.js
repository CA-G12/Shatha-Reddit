const connection = require('../config/connection')

const downVoteQuery =(post_id, user_id)=> 
connection.query('insert into votes (post_id, user_id, type) values($1,$2,$3) returning *',[post_id, user_id,'down'])

module.exports = downVoteQuery