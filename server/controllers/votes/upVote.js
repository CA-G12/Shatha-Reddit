const upVoteQuery = require('../../database/queries/upVoteQuery');
const upVote = (req,res)=>{
  const  {post_id , user_id} = req.body;
    upVoteQuery(post_id,user_id).then(data=> res.json(data.rows)).then(console.log)
}
module.exports = upVote;