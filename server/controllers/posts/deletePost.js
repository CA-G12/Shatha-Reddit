const {deletePostQuery} = require('../../database/queries/index')
const deletePost = (req,res)=>{
    const {post_id} = req.body
    console.log(post_id)
deletePostQuery(post_id).then(data=> res.json(data.rows))
}

module.exports = deletePost;