const downVoteQuery = require('../../database/queries/downVoteQuery');
const downVote = (req,res)=>{
  const  {post_id , user_id} = req.body;
    downVoteQuery(post_id,user_id).then(data=> res.json(data.rows)).then(console.log)
}
module.exports = downVote;