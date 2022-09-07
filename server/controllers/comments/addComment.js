const addCommentQuery = require('../../database/queries/addCommentQuery')
const addComment = (req,res)=>{
    const {comment,user_id ,post_id} = req.body
    console.log(comment,user_id ,post_id)
    addCommentQuery(comment,user_id,post_id).then(data=> res.json(data.rows[0])).then(console.log)


}

module.exports = addComment