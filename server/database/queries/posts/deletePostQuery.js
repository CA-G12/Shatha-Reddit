const connection = require('../../config/connection')
const deletePostQuery=(post_id)=> connection.query('delete from posts where posts.id =$1',[post_id])

module.exports = deletePostQuery;